const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const Poll = mongoose.model('polls')

router.get('/all', (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0
  let limit = req.query.limit ? parseInt(req.query.limit, 10) : 5

  const findCountPromise = Poll.find().countDocuments()

  const findPollsPromise = Poll.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)

  Promise.all([findCountPromise, findPollsPromise])
    .then(([count, polls]) => {
      res.json({ count, polls })
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server Error')
    })
})

router.get('/info/:id', (req, res) => {
  Poll.findById(req.params.id).then((poll) => {
    res.json(poll)
  })
})

router.post('/submit', (req, res) => {
  new Poll(req.body)
    .save()
    .then((savedPoll) => {
      res.json({ id: savedPoll._id.toString() })
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server Error')
    })
})

router.get('/user/:id', (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0
  let limit = req.query.limit ? parseInt(req.query.limit, 10) : 5

  const findCountPromise = Poll.find({ userId: req.params.id }).countDocuments()

  const findPollsPromise = Poll.find({ userId: req.params.id })
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)

  Promise.all([findCountPromise, findPollsPromise])
    .then(([count, polls]) => {
      res.json({ count, polls })
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server Error')
    })
})

router.delete('/delete/:id', (req, res) => {
  Poll.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send({ status: 'Poll deleted' })
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server Error')
    })
})

router.put('/vote', (req, res) => {
  Poll.findById(req.body.id)
    .then((poll) => {
      const index = poll.pollOptions
        .map(({ option }) => option)
        .indexOf(req.body.selection)
      if (index > -1) {
        poll.pollOptions[index].votes++
      } else {
        const customIndex = poll.pollOptions
          .map(({ option }) => option)
          .indexOf(req.body.customSelection)
        if (customIndex > -1) {
          return res
            .status(304)
            .send({ msg: 'Custom option is the same as a predefined option' })
        } else {
          poll.pollOptions.push({ option: req.body.customSelection, votes: 1 })
        }
      }
      poll
        .save()
        .then((savedPoll) => {
          res.send(savedPoll)
        })
        .catch((err) => {
          console.error(err.message)
          res.status(500).send('Server Error')
        })
    })
    .catch((err) => {
      console.error(err.message)
      res.status(500).send('Server Error')
    })
})

module.exports = router
