/* Global Variables */

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = '&APPID=583a1fb85e7163a153b90ed55f4e4c03';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

// Function to run API program

function performAction() {

  const zipCode = document.getElementById('zip').value;
  const feeling = document.getElementById('feelings').value;
  console.log(zipCode)
  console.log(feeling)

  // function to get inserted API Data
  const weather = getData(baseURL, zipCode, key);
  let temp = weather.main.temp;
  const data = {date: newDate, temp: temp, content: feeling}
  await postData('/add', data)

};


// Function GET API data

const getData = async (baseURL, zipCode, key)=> {

  let currURL = (baseURL + zipCode + key);
  console.log(currURL)
  const response = await fetch(currURL)
  console.log(response)

  try{
    const parse = await response.json();
    console.log(parse)
    console.log(parse.date)
    return parse
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
    // const data = await response.json();
    return response.json(); // parses JSON response into native JavaScript objects
  }
  catch (error){
    console.log("Error POST Data", error);
  }
};

//Function to UpdateUI

const updateUI = async () => {
  const request = await fetch("/all");
  const data = request.json();
  try {
    // const data = await request.json();
    document.getElementById('temp').innerHTML = data.temperature;
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('content').innerHTML = data.user_response;
  }
  catch (error){
    console.log("Error Updating UI", error);

  }
};
