const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateOtp } = require('../utils/otp');



exports.signup = async (req, res) => {
    const { name, mobile, email, dob, gender, address, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name: name,
            mobile: mobile,
            email: email,
            dob: dob,
            gender: gender,
            address: address,
            password: hashedPassword
        })

        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "error while signing-up" });
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