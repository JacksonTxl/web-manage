module.exports = app => {
  app.get('/v1/common/menu', (req, res) => {
    res.status(500).json({})
  })
}
