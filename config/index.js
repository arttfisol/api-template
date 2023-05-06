const { Joi } = require('express-validation')

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('production', 'development', 'test')
    .default('development'),
  PORT: Joi.number().default(4000)
})
  .unknown()
  .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error}`)
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT
}

module.exports = config
