const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema(
  {
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: Date, versionKey: false }
)

module.exports = mongoose.model('Card', cardSchema)
