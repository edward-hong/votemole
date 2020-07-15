const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

router.get('/google/callback', passport.authenticate('google'))

router.get('/facebook', passport.authenticate('facebook'))

router.get('/facebook/callback', passport.authenticate('facebook'))

router.get('/twitter', passport.authenticate('twitter'))

router.get('/twitter/callback', passport.authenticate('twitter'))

router.get('/logout', (req, res) => {
  req.logout()
  res.send(req.user)
})

router.get('/current_user', (req, res) => {
  res.send(req.user)
})

module.exports = router
