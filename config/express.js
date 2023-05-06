const _ = require('lodash')
const cors = require('cors')
const app = require('express')()
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const logs = require('../server/helpers/logs')
const routes = require('../server/routes/index')
const { ValidationError } = require('express-validation')

// parse body params and attache them to req.body
app.use(bodyParser.json({
  limit: '40mb'
}))
app.use(bodyParser.urlencoded({
  extended: true
}))

// access log
app.use(morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', { stream: logs.stream }))

app.use(cors())
app.use(helmet())

// mount all routes on /api path
app.use((req, res, next) => {
  try {
    req.request_id = `${new Date().getTime()}_${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`
    next()
  } catch (err) {
    next(err)
  }
})

app.use('/api', routes)

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const message = {}
    _.set(message, 'query', _.get(err, 'details.query[0].message', undefined))
    _.set(message, 'params', _.get(err, 'details.params[0].message', undefined))
    _.set(message, 'body', _.get(err, 'details.body[0].message', undefined))
    return res.status(400).json({
      message
    })
  } else {
    return res.status(500).json({
      message: err.message
    })
  }
})

module.exports = app
