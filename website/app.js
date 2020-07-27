/* Global Variables */

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = '&APPID=583a1fb85e7163a153b90ed55f4e4c03';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

// Function to run API program

function performAction() {

  let zipCode = document.getElementById('zip').value;
  let feeling = document.getElementById('feelings').value;
  // console.log(zipCode)
  // console.log(feeling)

  // function to get inserted API Data
  getData(baseURL, zipCode, key)
  // console.log(weather); //promise
  .then(function(data){
    postData('/add', {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      date: newDate,
      user_response: feeling
    })
  }
)
  .then(function(data){
    updateUI()
  })
};


// Function GET API data

const getData = async (baseURL, zipCode, key)=> {

  let currURL = (baseURL + zipCode + key);
  console.log(currURL)
  const response = await fetch(currURL)
  // console.log(response) // response info
  try{
    const parse = await response.json();
    // console.log(parse) // weather information parsed JSON
    // console.log(parse.name)
    return parse // return information parsed by JSON
  }
  catch(error) {
      console.log('Error receiving API response')
  }
};

// Function POST API data
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  try{
    return response.json(); // parses JSON response into native JavaScript objects
  }
  catch (error){
    console.log("Error POST Data", error);
  }
};

//Function to UpdateUI

const updateUI = async () => {
  const request = await fetch("/all");
  const data = await request.json();
  try {
    // const data = await request.json();
    console.log("debugg");
    console.log(data);
    document.getElementById('temp').innerHTML = `<p>Country: ${data.country}</p><p>City:
    ${data.city}</p><p>Today's Temperature: ${data.temperature} F</p>`;
    // document.getElementById('temp').innerHTML = `<p>City: ${data.city}</p>`;
    // document.getElementById('temp').innerHTML = `<p>Today's Temperature: ${data.temperature}</p>`;
    document.getElementById('date').innerHTML = `<p>Date: ${data.date}</p>`;
    document.getElementById('content').innerHTML = `<p>Feeling: ${data.user_response}</p>`;
  }
  catch (error){
    console.log("Error Updating UI", error);
  }
};
