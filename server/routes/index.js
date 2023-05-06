const express = require('express')

const router = express.Router()

/** GET /ping - Check service health */
router.get('/ping', (req, res) => {
  res.send('pong')
})

router.use('/users', require('./user'))

module.exports = router
