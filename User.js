const mongoose = require('mongoose')

// Schema ist eine Funktion
// new weist auf Objektorientierte Programmierung hin und gibt uns ein this
const userSchema = new mongoose.Schema({
  name: String,
  role: String,
})

module.exports = mongoose.model('User', userSchema)
