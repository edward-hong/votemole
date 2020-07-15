require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const authRoutes = require('./routes/authRoutes')

require('./models/User')

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

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hi there')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App started on port: ${PORT}`))
