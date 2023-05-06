const express = require('express')
const validate = require('../../config/validators')
const userController = require('../controllers/user')
const userValidator = require('../../config/validators/user')

const router = express.Router({
  mergeParams: true
})

router.route('/')
  .get(validate(userValidator.listUser), userController.listUser)
  .post(validate(userValidator.createUser), userController.createUser)

router.route('/:user_id')
  .get(validate(userValidator.getUser), userController.getUser)
  .put(validate(userValidator.updateUser), userController.updateUser)
  .delete(validate(userValidator.deleteUser), userController.deleteUser)

router.param('user_id', userController.load)

module.exports = router
