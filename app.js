const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateUrl = require('./generate_url')

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  let randomUrl = generateUrl()
  res.render('index', { randomUrl })
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
