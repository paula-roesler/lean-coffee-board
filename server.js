const express = require('express')
const { v4: uuidv4 } = require('uuid') // npm install uuid
uuidv4()

const app = express()

const users = []

app.use(express.json()) // add middleware for json data

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params //destructuring Assignment
  res.json(users.find(user => user.id === id))
})

app.post('/api/users', (req, res) => {
  const newUser = { ...req.body, id: uuidv4() }
  users.push(newUser)
  res.json(newUser)
})

app.get('/api/cards', (req, res) => {
  res.json([{ title: 'First card' }])
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
