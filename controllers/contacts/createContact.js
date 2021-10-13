const { Contact } = require('../../models')

const createContact = async (req, res, next) => {
  try {
    const newContact = { ...req.body, owner: req.user._id }
    // console.log(newContact)
    const result = await Contact.create(newContact)
    res.status(201).json({
      status: 'sucess',
      code: 201,
      message: `✔️ Contact '${req.body.name}' added`,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = createContact
