const express = require('express')
const port = 3000
const app = express()

app.get('/', (req, res) => {
  res.send('this is url_shortener')
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
