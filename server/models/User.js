const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  twitterId: String,
  githubId: String,
})

mongoose.model('users', userSchema)
