const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema(
  {
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: Date, versionKey: false }
)

module.exports = mongoose.model('Card', cardSchema)
