var express = require('express')
var app = express()
var request = require('request')
var bodyParser = require('body-parser')
var fs = require('fs')

//creating sample data and send to test.json
let sampleData = {fname: "Edward", lanme: "Wong"}
let sampleDataJSON = JSON.stringify(sampleData)
fs.writeFileSync('json/test.json', sampleDataJSON)

//read from test.json
let readData = JSON.parse(fs.readFileSync('json/test.json'))
console.log(readData)



//redirects to the public directory
app.use(express.static('public'))

app.use(bodyParser.json())

//initialize server at port 4000
app.listen(4000, function () {
  console.log('stock app listening on port 4000!')
})

// The main entry point for the app, simply take external requests from the browser and proxy them through Node
app.get('/getFundInfo', function (req, res) {
  // Make the API call, passing in the anonymouse callback function when the API call returns
  request(req.query.url, function (error, response, body) {
    // Print the error if one occurred
    if(error) {
      console.log('error:', error)
      res.json({status: 'ERROR'})
      return
    }
    // Print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode)

    // Send response body back to broswer as JSON
    res.setHeader('Content-Type', 'application/json')
    res.json(body)
  })
})
