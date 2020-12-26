const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'))

console.log(__dirname)

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})

///////////////// routes ///////////////
app.get('/', function(req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})
app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

/// Global variables ///
const apiURL = "https://api.meaningcloud.com/sentiment-2.1?key=";
const apikey = process.env.API_KEY;
const urlText = "&lang=en&of=json&txt=";
userURL = {}

/// post route 
app.post('/data', async(req, res) => {
    /// store the url entered by the user in the userURL object
    userURL = req.body.url;
    /// fetch the api with userURL as an input
    const response = await fetch(apiURL + apikey + urlText + userURL);
    /// store the respose in a variable
    const responseData = await response.json();
    /// display the data obtained from the api in the console
    console.log(responseData);
    /// send the data to the client side to update the UI 
    res.json(responseData);
})