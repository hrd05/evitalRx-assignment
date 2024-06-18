const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    // otp: { type: String },
    // otpExpires: { type: Date },
    // isVerified: { type: Boolean, default: false },

})

module.exports = mongoose.model('User', userSchema);