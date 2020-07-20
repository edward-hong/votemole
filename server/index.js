require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./models/User')
require('./models/Poll')

const authRoutes = require('./routes/authRoutes')
const pollRoutes = require('./routes/pollRoutes')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  }),
)

app.use(passport.initialize())
app.use(passport.session())

require('./services/passport')

app.use('/api/auth', authRoutes)
app.use('/api/poll', pollRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App started on port: ${PORT}`))
