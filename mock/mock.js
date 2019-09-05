const express = require('express')

const app = express()

const PORT = 8059

app.all('*', (req, res, next) => {
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

/**
 * MOCK start
 */

app.get('/v1/common/menu', (req, res) => {
  res.json({
    code: 0,
    data: {
      first_url: 'haha',
      menus: [{ id: 1, name: 'cc' }]
    }
  })
})

/**
 * MOCK end
 */

app.listen(PORT, () => {
  console.log(`mock server started on http://localhost:${PORT}`)
})
