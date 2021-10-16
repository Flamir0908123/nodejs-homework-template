const { User } = require('../../models')

const subscription = async (req, res) => {
  //   console.log({ subscription })
  //   console.log(req.body)
  try {
    const { _id } = req.user
    // console.log(req.user.subscription)
    const { subscription } = req.body
    // console.log(subscription)

    if (
      (subscription === 'starter' ||
        subscription === 'pro' ||
        subscription === 'business') &&
      subscription !== req.user.subscription
    ) {
      const user = await User.findByIdAndUpdate(
        _id,
        { subscription },
        {
          new: true,
        },
      )
      if (user) {
        res
          .status(200)
          .json({ email: user.email, subscription: user.subscription })
        return
      }
    }
    res.json({
      status: 'error',
      code: 404,
      message: 'Alredy subcribed or wrong subscription',
    })
  } catch (error) {
    res.status(404).json(error)
  }
}

module.exports = subscription
