/* Global Variables */

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = '583a1fb85e7163a153b90ed55f4e4c03';

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
  getData(baseURL, zipCode, key)
//   .then((data))=> {
//     const req = {
//
//     }
//   }
//
}


// Function GET API data

const getData = async (baseURL, zipCode, key)=> {

  let currURL = (baseURL + zipCode + key);
  console.log(currURL)
  const response = await fetch(currURL)
  console.log(response)

  try{
    const parse = await response.json();
    console.log(parse)
    return parse
  }
  catch(error) {
      console.log('Error receiving API response')
  }
};

// Function POST API data

//Function to UpdateUI
