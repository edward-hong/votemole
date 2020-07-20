require('dotenv').config()

const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const TwitterStrategy = require('passport-twitter').Strategy
const GithubStrategy = require('passport-github2').Strategy

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user))
        }
      })
    },
  ),
)

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/api/auth/facebook/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          new User({ facebookId: profile.id })
            .save()
            .then((user) => done(null, user))
        }
      })
    },
  ),
)

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: '/api/auth/twitter/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ twitterId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          new User({ twitterId: profile.id })
            .save()
            .then((user) => done(null, user))
        }
      })
    },
  ),
)

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ githubId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser)
        } else {
          new User({ githubId: profile.id })
            .save()
            .then((user) => done(null, user))
        }
      })
    },
  ),
)
