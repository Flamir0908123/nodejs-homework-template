const express = require('express')
const router = express.Router()
const {
  joiSchema,
  updateFavoriteSchema,
} = require('../../models/contacts/contacts')
const { validation, authenticate } = require('../../middlewares')
const contactsController = require('../../controllers')

const contactValidation = validation(joiSchema)
const favoriteValidation = validation(updateFavoriteSchema)

router.get('/', authenticate, contactsController.getAllContacts)

router.get('/:contactId', authenticate, contactsController.getById)

router.post(
  '/',
  authenticate,
  contactValidation,
  contactsController.createContact,
)

router.delete('/:contactId', authenticate, contactsController.deleteContact)

router.put(
  '/:contactId',
  authenticate,
  contactValidation,
  contactsController.updateContact,
)

router.patch(
  '/:contactId/favorite',
  authenticate,
  favoriteValidation,
  contactsController.updateFavorite,
)

module.exports = router
