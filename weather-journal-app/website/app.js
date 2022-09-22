//server endpoints for get ***/getData***
//for Post ***/saveData***

/* Global Variables */
const generateBtn = document.getElementById('generate');
const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const date = document.getElementById('date');
const zip = document.getElementById('zip');
const content = document.getElementById('content');

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='

// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=fd182ee52fafafc1e35dd4fa37d96ce0&units=imperial';
//Data object to store all data for post Request
const data = {};

getData();

// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener('click', async function () {
    //check if its not empty
    if (zipInput.value === '') {
        return;
    }
    let temp = await fetchApi();
    //IF there is error return
    if (temp != ''){
        data.temp = temp;
    }else{
        return;
    }
    data.date = getDate();
    data.feelings = feelingsInput.value;

    postData('/saveData', data).then(() => {
        getData();
    });

});

/* Function to GET Web API Data*/
async function fetchApi() {
    let fullUrl = baseUrl + zipInput.value + apiKey;
    try {
        const request = await fetch(fullUrl);
        const data = await request.json();
        let temp = data.main.temp;
        console.log(temp);
        return temp;
    } catch (e) {
        console.log(`error ${e}`);
        return '';
    }
}

function getDate() {
    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    return newDate;
}

/* Function to GET Project Data */
async function getData() {
    const response = await fetch('/getData');
    try {
        let resData = await response.json();
        //checking resData not empty
        date.innerHTML = resData.date != undefined ? 'Date: ' + resData.date : '';
        temp.innerHTML = resData.temp != undefined ? Math.round(resData.temp)+ ' degrees' : '';
        content.innerHTML = resData.feelings != undefined ? resData.feelings : '';

        return data;
    } catch (e) {
        console.log(`error ${e}`);
    }
}

/* Function to POST data */
async function postData(url = '', data = {}) {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        //console.log(response);
        return response;
    } catch (error) {
        console.log("error", error);
    }
}
