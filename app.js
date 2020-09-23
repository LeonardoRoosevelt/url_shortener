const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateUrl = require('./generate_url')
const Url = require('./models/url')

require('./config/mongoose')
const app = express()

app.use(express.static('public'))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/urlShortener', (req, res) => {
  const url = req.body.url
  let randomUrl = ''
  let urlAlready = false
  Url.find()
    .lean()
    .then(urlShorteners => {
      for (const urlShortener of urlShorteners) {
        if (url === urlShortener.url) {
          randomUrl = urlShortener.url_shortener
          urlAlready = true
          return randomUrl, urlAlready
        }
      }
      if (urlAlready === false) {
        randomUrl = generateUrl()
        Url.create({ url, url_shortener: randomUrl })
        return randomUrl
      }
    })
    .then(() => res.render('generate', { randomUrl }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
