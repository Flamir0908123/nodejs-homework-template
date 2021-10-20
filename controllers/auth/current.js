const { User } = require('../../models')

const current = async (req, res) => {
  // console.log(req.user)
  try {
    const { _id } = req.user
    // console.log({ _id })
    const user = await User.findById(_id)
    // console.log(user)
    if (user) {
      res
        .status(200)
        .json({ email: user.email, subscription: user.subscription })
      return
    }
  } catch (error) {
    res.json(error)
  }
}

module.exports = current
