var express = require('express')
var app = express()
var request = require('request')
var bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.json())

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})


