module.exports = (err, req, res, next) => {
  console.log(err.message) // err objekt hat immer eine message property
  res.JSON({ error: err.message })
}
