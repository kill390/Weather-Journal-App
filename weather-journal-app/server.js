// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
// Start up an instance of app
const app = express();
const port = 8888;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
// Callback function to complete GET
app.get('/getData',function(req,res){
    res.send(projectData);
    console.log('Get Request is done');
});

// Post Route
app.post('/saveData', function(req,res){
    let data = req.body;
    console.log(data);
    projectData.date = data.date;
    projectData.temp = data.temp;
    projectData.feelings = data.feelings;

    res.send('done..');
});

app.listen(port, function(){
    // Callback to debug
    console.log(`server is up and running on port ${port}`);
});