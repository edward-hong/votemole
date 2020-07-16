const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/')
})

router.get('/facebook', passport.authenticate('facebook'))

router.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    res.redirect('/')
  },
)

router.get('/twitter', passport.authenticate('twitter'))

router.get(
  '/twitter/callback',
  passport.authenticate('twitter'),
  (req, res) => {
    res.redirect('/')
  },
)

router.get('/github', passport.authenticate('github'))

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  res.redirect('/')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/current_user', (req, res) => {
  res.send(req.user)
})

module.exports = router
