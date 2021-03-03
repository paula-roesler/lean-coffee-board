const express = require('express')
const { v4: uuidv4 } = require('uuid') // npm install uuid
const mongoose = require('mongoose')
const User = require('./User')

mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(error => console.error('Could not connect to mongodb', error))

const app = express()

let users = []

app.use(express.json()) // add middleware for json data

app.get('/api/users', async (req, res) => {
  res.json(await User.find())
})

// user eine uuid zuweisen und nach id suchen
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params //destructuring Assignment
  res.json(await User.findOne({ id }))
})

// user nach id löschen // curl -H http://localhost:3000/user/<id>
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  const index = users.findIndex(user => user.id === id)
  users = [...users.slice(0, index), ...users.slice(index + 1)]
  res.json(users)
})

app.post('/api/users', async (req, res) => {
  //   const newUser = { ...req.body, id: uuidv4() }
  //   users.push(newUser)
  res.json(await User.create(req.body)) // erzeugt uns einen neuen user und eine id wird automatisch erzeugt
})

app.get('/api/cards', (req, res) => {
  res.json([{ title: 'First card' }])
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
