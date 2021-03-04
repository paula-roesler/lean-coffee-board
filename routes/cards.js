const express = require('express')
const Card = require('../models/Card')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await Card.find().populate('author').catch(next))
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await Card.findById(id).populate('author').catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(await Card.create(req.body).catch(next))
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await Card.findByIdAndDelete(id).catch(next))
})

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(
    await Card.findByIdAndUpdate(id, req.body, { new: true }).catch(next)
  )
})

router.patch('/:id/vote', async (req, res, next) => {
  const { id } = req.params
  res.json(
    await Card.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } }, // $inc = increment votes um 1 wenn url/:id/vote aufgerufen wird
      { new: true }
    ).catch(next)
  )
})

module.exports = router
