const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const { text } = require('express')

mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(error => console.error('Could not connect to mongodb', error))

const app = express()

app.use(express.json()) // add middleware for json data

app.use('/api/users', require('./routes/users'))
app.use('/api/cards', require('./routes/cards'))

app.use((err, req, res, next) => {
  console.log(err.message) // err objekt hat immer eine message property
  res.JSON({ error: err.message })
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
