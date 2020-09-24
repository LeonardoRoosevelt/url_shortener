const express = require('express')
const PORT = process.env.PORT || 3000
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
  let shorterList = []
  Url.find()
    .lean()
    .then(urlShorteners => {
      // 檢查輸入的網址是否有重複
      for (const urlShortener of urlShorteners) {
        if (url === urlShortener.url) {
          randomUrl = urlShortener.url_shortener
          urlAlready = true
          return randomUrl, urlAlready
        }
        if (!shorterList.includes(urlShortener.url_shortener)) {
          shorterList.push(urlShortener.url_shortener)
        }
      }
      // 檢查產出的亂數短網址是否重複
      if (urlAlready === false) {
        randomUrl = generateUrl()
        while (shorterList.includes(randomUrl)) {
          // console.log('重複')
          // console.log(randomUrl)
          randomUrl = generateUrl()
        }
      }
      // console.log(randomUrl)
      // console.log(shorterList)
      Url.create({ url, url_shortener: randomUrl })
      return randomUrl
    })
    .then(() => res.render('generate', { randomUrl }))
    .catch(error => console.log(error))
})

app.get('/:randomUrl', (req, res) => {
  const shortUrl = req.params.randomUrl
  let correctUrl = '/'

  Url.find()
    .lean()
    .then(urlShorteners => {
      // 檢查輸入的短網址是否正確，不正確導回首頁
      for (const urlShortener of urlShorteners) {
        if (shortUrl === urlShortener.url_shortener) {
          correctUrl = urlShortener.url
          return correctUrl
        }
      }
    })
    .then(() => res.redirect(correctUrl))
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
