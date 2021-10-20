const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const subscription = require('./subscription')
const avatarUpdate = require('./avatarUpdate')
const verify = require('./verify')
const resendingEmail = require('./resendingEmail')

module.exports = {
  signup,
  login,
  logout,
  current,
  subscription,
  avatarUpdate,
  verify,
  resendingEmail,
}
