require('dotenv').config()
const config = require('./config')
const app = require('./config/express')
const logs = require('./server/helpers/logs')

// let server

async function main () {
  logs.info('start instance...')

  try {
    // module.parent check is required to support mocha watch
    // src: https://github.com/mochajs/mocha/issues/1912
    if (!module.parent) {
      // listen on port config.port
      app.listen(config.port, () => logs.info(`server started on port ${config.port} (${config.env})`))
    }
  } catch (err) {
    logs.error(err.message)
    process.exit(0)
  }
}

main()

module.exports = app
