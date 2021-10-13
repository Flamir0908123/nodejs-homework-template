const express = require('express')
const { auth: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user/user')
const { validation, authenticate, upload } = require('../../middlewares')

const router = express.Router()
const userValidation = validation(joiSchema)

router.post('/signup', userValidation, ctrl.signup)
router.post('/login', userValidation, ctrl.login)
router.get('/logout', authenticate, ctrl.logout)
router.get('/current', authenticate, ctrl.current)
router.patch('/', authenticate, ctrl.subscription)
router.patch(
  '/avatars',
  authenticate,
  upload.single('image'),
  ctrl.avatarUpdate,
)

module.exports = router
