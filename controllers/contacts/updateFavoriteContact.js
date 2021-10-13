const { Contact } = require('../../models')

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { favorite } = req.body
    if (favorite === undefined) {
      return res.status(400).json({
        message: 'missing field favorite',
      })
    }
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      },
    )
    if (!result) {
      res.status(400).json({
        status: 'error',
        code: 404,
        message: `Conatct with ID=${contactId} not found`,
      })
    }
    res.json({
      status: 'success',
      code: 200,
      message: '✔️ "Favorite" updated',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateFavorite
