const mongoose = require('mongoose')
const { Schema } = mongoose

const pollSchema = new Schema({
  ip: [String],
  userId: { type: String, required: true },
  pollQuestion: { type: String, required: true },
  pollOptions: [{ votes: Number, option: String }],
})

mongoose.model('polls', pollSchema)
