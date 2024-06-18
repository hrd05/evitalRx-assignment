const { Schema, default: mongoose, MongooseError } = require('mongoose');

const forgotPasswordSchema = new Schema({
    _id: { type: String, required: true },
    active: { type: Boolean },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('ForgotPass', forgotPasswordSchema);

