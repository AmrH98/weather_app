// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');


// body-parser dependencies
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// GET route that returns the projectData object
app.get('/all', getData);

function getData(req, res){
  console.log("GET Request received")
  res.send(projectData);
}

// POST route that adds incoming data to projectData

app.post('/add', addData);

function addData(req, res){
  projectData.temperature = req.body.temperature;
  projectData.date = req.body.date;
  projectData.user_response = req.body.user_response;
  console.log("POST Request received");
  console.log(projectData);
  res.send(projectData);
}

// Setup Server

const port = 3004;
const server = app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`));
