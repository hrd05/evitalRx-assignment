
const User = require('../models/user');
const ForgotPass = require('../models/forgotPass');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const sendEmail = require('../utils/sendEmail');


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {

        const user = await User.findOne({ email: email })
        if (!user) return res.status(404).json({ message: "user not found" });
        const id = uuid.v4();
        await ForgotPass.create({ _id: id, active: true, userId: user._id });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset',
            text: 'Click the follwing link to update your password',
            html: `<a href="http://localhost:5000/reset-password/${id}">http://localhost:5000/reset-password/${id}</a>`
        }

        const response = await sendEmail(mailOptions);
        if (response.success) {
            return res.status(200).json({ message: 'Link to reset password sent to your mail', success: true });
        }
        else {
            return res.status(500).json({ message: 'Failed to send email', success: false });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'server error' });
    }
}


exports.resetPassword = async (req, res) => {
    const { id } = req.params;
    try {
        const forgotPassRequest = await ForgotPass.findById(id);
        if (!forgotPassRequest || !forgotPassRequest.active) {
            return res.status(400).json({ error: 'Invalid or expired reset request.' });
        }

        return res.status(200).send(
            `<html>
                <script>    
                    function formsubmitted(e){
                        e.preventDefault();
                    }
                </script>
    
                <form action="/update-password/${id}" method="get">
                    <label for="newpassword">Enter New password</label>
                    <input name="newpassword" type="password" required></input>
                    <button type="submit">reset password</button>
                </form>
            </html>`
        )

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { newpassword } = req.query;
    try {
        // console.log(id, newpassword);
        const forgotPassRequest = await ForgotPass.findById(id);
        if (forgotPassRequest.active) {
            const newHashedPassword = await bcrypt.hash(newpassword, 10);
            await User.findByIdAndUpdate(forgotPassRequest.userId, { password: newHashedPassword });
            forgotPassRequest.active = false;
            await forgotPassRequest.save();
            res.status(201).json({ message: 'Successfuly update the new password' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json('Failed to update');
    }
}