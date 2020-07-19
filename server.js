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
  res.send(projectData);
}

// POST route that adds incoming data to projectData

app.post('/addWD', addData);

function addData(req, res){
  projectData.temperature = request.body.temperature;
  projectData.date = request.body.date;
  projectData.user_response = request.body.user_response;
  response.send(projectData);
  console.log(projectData);
}

// Setup Server

const port = 3005;
const server = app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`));
