const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const { text } = require('express')
const User = require('./models/User')
const Card = require('./models/Card')

mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(error => console.error('Could not connect to mongodb', error))

const app = express()

app.use(express.json()) // add middleware for json data

app.get('/api/users', async (req, res, next) => {
  res.json(await User.find().catch(next))
})

app.get('/api/users/:id', async (req, res, next) => {
  const { id } = req.params //destructuring Assignment
  res.json(await User.findOne({ id }).catch(next))
})

app.delete('/api/users/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await User.deleteOne({ id }).catch(next))
})

app.post('/api/users', async (req, res, next) => {
  res.json(await User.create(req.body).catch(next))
})

/* --- CARDS --- */
app.get('/api/cards', async (req, res, next) => {
  res.json(await Card.find().populate('author').catch(next))
})

app.get('/api/cards/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await Card.findOne({ id }).populate('author').catch(next))
})

app.post('/api/cards', async (req, res, next) => {
  res.json(await Card.create(req.body).catch(next))
})

app.delete('/api/cards/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await Card.deleteOne({ id }).catch(next))
})

app.use((err, req, res, next) => {
  console.log(err.message) // err objekt hat immer eine message property
  res.JSON({ error: err })
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
