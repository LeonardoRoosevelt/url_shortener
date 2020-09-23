const mongoose = require('mongoose')
// mongoose 定義資料的方式
const Schema = mongoose.Schema

const urlSchema = new Schema({
  url: {
    type: String,
    require: true
  },
  url_shortener: {
    type: String
  }
})
module.exports = mongoose.model('Url', urlSchema)
