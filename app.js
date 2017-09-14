const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const fs = require('fs');

//creating sample data and send to test.json
let sampleData = {fname: "Edward", lanme: "Wong"};
let sampleDataJSON = JSON.stringify(sampleData);
fs.writeFileSync('json/test.json', sampleDataJSON);

//read from test.json
let readData = JSON.parse(fs.readFileSync('json/test.json'));
console.log(readData);



//redirects to the public directory
app.use(express.static('public'));

app.use(bodyParser.json());

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

//initialize server at port 4000
app.listen(4000, function () {
  console.log('stock app listening on port 4000!');
});

// The main entry point for the app, simply take external requests from the browser and proxy them through Node
app.get('/getFundInfo', function (req, res) {
  // Make the API call, passing in the anonymouse callback function when the API call returns
  request(req.query.url, function (error, response, body) {
    // Print the error if one occurred
    if(error) {
      console.log('error:', error);
      res.json({status: 'ERROR'});
      return;
    }
    // Print the response status code if a response was received
    console.log('statusCode:', response && response.statusCode);
    // console.log(body);
    // send status 404 if request is not found
    if (response.statusCode === 404) {
      res.json({status: response.statusCode});
      return;
    }
    // Send response body back to broswer as JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(body);
  });
});

//take get requests from website and send appropriate data from Local JSON sessionStorage
app.get('/getLocalData', function (req, res) {
  console.log(req.query.url);
  var userData = JSON.parse(fs.readFileSync(req.query.url));
  res.json(userData);
});

//takes in login post data and redirect to myAccount
app.post('/index.html', function (req, res) {
  res.redirect('/myAccount.html');
  // if (req.body.password === "123456") {
  //   res.redirect('/myAccount.html')
  // } else {
  //   res.json("{err: invalid password}")
  // }
});
