const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')
const fs = require('fs')
const logDir = './logs'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

class Logs {
  constructor () {
    this._format = format.printf(info => `${info.timestamp} ${info.level.padEnd(info.level.length <= 7 ? 7 : 17, ' ')}: ${info.message}`)
    this._allTransports = [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          this._format
        )
      })
    ]

    if (process.env.NODE_ENV === 'production' || process.env.ENABLE_LOG_FILE === 'true') {
      this._allTransports.push(new transports.DailyRotateFile({
        filename: `${logDir}/%DATE%.log`,
        datePattern: 'YYYYMMDD',
        format: format.combine(
          this._format
        )
      }))
    }

    this._logs = createLogger({
      level: 'silly',
      format: format.combine(
        format.timestamp()
      ),
      transports: this._allTransports
    })

    this.stream = {
      write: (message, encoding) => {
        this._logs.info(message.trim())
      }
    }
  }

  error (...messages) {
    const msg = this._parse(messages)
    this._logs.error(msg)
  }

  warn (...messages) {
    const msg = this._parse(messages)
    this._logs.warn(msg)
  }

  info (...messages) {
    const msg = this._parse(messages)
    this._logs.info(msg)
  }

  http (...messages) {
    const msg = this._parse(messages)
    this._logs.http(msg)
  }

  verbose (...messages) {
    const msg = this._parse(messages)
    this._logs.verbose(msg)
  }

  debug (...messages) {
    const msg = this._parse(messages)
    this._logs.debug(msg)
  }

  silly (...messages) {
    const msg = this._parse(messages)
    this._logs.silly(msg)
  }

  _parse (messages) {
    const arr = messages.map(msg => {
      if (typeof (msg) === 'object') {
        return JSON.stringify(msg)
      }
      return msg
    })

    return arr.join('')
  }
}

module.exports = new Logs()
