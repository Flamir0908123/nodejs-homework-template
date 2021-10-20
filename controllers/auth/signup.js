const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const { v4 } = require('uuid')
const { sendEmail } = require('../../helpers')

const signup = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body
    console.log(req.body)
    const user = await User.findOne({ email })

    if (user) {
      throw new Conflict('Already register')
    }
    const avatarURL = gravatar.url(email)
    const verificationToken = v4()

    const newUser = new User({
      email,
      subscription,
      avatarURL,
      verificationToken,
    })
    newUser.setPassword(password)
    await newUser.save()

    const emailMessage = {
      to: newUser.email,
      subject: 'Account verification',
      html: `
        <a href = "http://localhost:3000/users/verify/${verificationToken}" target="_blank">Verify link</a>`,
    }
    await sendEmail(emailMessage)

    res.status(201).json({
      status: 'success',
      code: 201,
      message: ' Success register',
      newUser,
    })
  } catch (error) {
    res.status(409).json(error.message)
  }
}
module.exports = signup
