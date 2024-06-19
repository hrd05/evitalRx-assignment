const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const { generateOtp } = require('../utils/otp');



exports.signup = async (req, res) => {
    const { name, mobile, email, dob, gender, address, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();

        await User.create({
            name: name,
            mobile: mobile,
            email: email,
            dob: dob,
            gender: gender,
            address: address,
            password: hashedPassword,
            otp: otp,
            otpExpires: new Date(Date.now() + 10 * 60 * 1000)
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'OTP verification',
            text: `Your OTP is ${otp}`,
        }
        const response = await sendEmail(mailOptions);
        if (!response.success) {
            return res.status(400).json({ message: 'error sending otp' });
        }
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "error while signing-up" });
    }
}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json('invalid Otp or expired');
        user.otp = undefined;
        user.otpExpires = undefined;
        user.isVerified = true;
        await user.save();
        res.status(200).json('OTP verified. Account activated.');
    }
    catch (err) {
        console.log(err);
    }
}

function generateAccessToken(id) {
    return jwt.sign({ userId: id }, process.env.JWT_TOKEN);
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const result = await bcrypt.compare(password, user.password);

        if (result) {
            res.status(200).json({ message: 'User logged succesfully', token: generateAccessToken(user.id), user });
        }
        else {
            res.status(401).json({ message: 'incorrect password' });
        }
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'something went wrong' });
    }
}

exports.updateProfile = async (req, res) => {
    const { name, mobile, dob, gender, address } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            name,
            mobile,
            dob,
            gender,
            address
        })

        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error updating profile' });
    }
}