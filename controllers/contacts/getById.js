const { Contact } = require('../../models')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    // const result = await Contact.findById(
    //   contactId,
    //   '_id name email phone favorite',
    // )
    // const { _id } = req.user
    const contact = { _id: contactId, owner: req.user._id }
    const result = await Contact.findOne(
      contact,
      '_id name email phone favorite owner',
    )
    if (!result) {
      const error = new Error(`Conatct with ID=${contactId} not found`)
      error.status = 404
      throw error
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Conatct with ID=${contactId} not found`,
      // })
      // return
    }
    res.json({
      status: 'sucess',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
