const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const Poll = mongoose.model('polls')

router.get('/all', (req, res) => {
  Poll.find()
    .then((polls) => {
      res.json(polls)
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server Error')
    })
})

module.exports = router
