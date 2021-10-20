const { User } = require('../../models')
const sgMail = require('@sendgrid/mail')
const { sendEmail } = require('../../helpers')
const { BadRequest, NotFound } = require('http-errors')
require('dotenv').config()
const { SENDGRID_KEY } = process.env

sgMail.setApiKey(SENDGRID_KEY)

const resendingEmail = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      throw new BadRequest('Missing required field email')
    }
    const user = await User.findOne({ email })

    if (!user) {
      throw new NotFound('User not found')
    }
    if (user.verify) {
      throw new BadRequest('Verification has already been passed')
    }

    const emailMessage = {
      to: user.email,
      subject: 'Account verification',
      html: `
        <a href = "http://localhost:3000/users/verify/${user.verificationToken}" target="_blank">Verify link</a>`,
    }

    await sendEmail(emailMessage)

    res.status(200).json({
      status: 'success',
      code: 200,
      message: ' Verification email sent',
    })
  } catch (error) {}
}

module.exports = resendingEmail
