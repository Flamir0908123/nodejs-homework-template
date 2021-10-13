const express = require('express')
const router = express.Router()
const {
  joiSchema,
  updateFavoriteSchema,
} = require('../../models/contacts/contacts')
const { validation } = require('../../middlewares')
const contactsController = require('../../controllers')

const contactValidation = validation(joiSchema)
const favoriteValidation = validation(updateFavoriteSchema)
router.get('/', contactsController.getAllContacts)

router.get('/:contactId', contactsController.getById)

router.post('/', contactValidation, contactsController.createContact)

router.delete('/:contactId', contactsController.deleteContact)

router.put('/:contactId', contactValidation, contactsController.updateContact)

router.patch(
  '/:contactId/favorite',
  favoriteValidation,
  contactsController.updateFavorite,
)

module.exports = router
