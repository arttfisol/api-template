const { Joi } = require('express-validation')

module.exports = {
  listUser: {
    query: Joi.object({
      skip: Joi.number().default(0),
      limit: Joi.number().default(10)
    })
  },
  createUser: {
    body: Joi.object({
      name: Joi.string().required()
    })
  },
  getUser: {
    params: Joi.object({
      user_id: Joi.string().required()
    })
  },
  updateUser: {
    params: Joi.object({
      user_id: Joi.string().required()
    })
  },
  deleteUser: {
    params: Joi.object({
      user_id: Joi.string().required()
    })
  }
}
