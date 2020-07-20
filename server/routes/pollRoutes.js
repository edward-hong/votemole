const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const Poll = mongoose.model('polls')

router.get('/all', (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0
  let limit = req.query.limit ? parseInt(req.query.limit, 10) : 5

  const findCountPromise = Poll.find().count()

  const findPollsPromise = Poll.find().skip(offset).limit(limit)

  Promise.all([findCountPromise, findPollsPromise])
    .then(([count, polls]) => {
      res.json({ count, polls })
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server Error')
    })
})

module.exports = router
