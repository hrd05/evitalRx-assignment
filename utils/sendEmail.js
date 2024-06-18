const nodemailer = require('nodemailer');

const sendEmail = async (mailOptions) => {
    try {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.GMAIL_PASS
            }
        })

        const response = await transport.sendMail(mailOptions);
        return {
            success: true,
            message: 'Email sent successfully',
            response
        }
    }
    catch (err) {
        return {
            success: false,
            message: 'Error sending email',
            err
        }
    }
}

module.exports = sendEmail;