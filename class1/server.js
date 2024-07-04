const express = require('express'); // express ka instance 
const app = express(); // express ka single instance initiate

// use to parser req.body in express 
const bodyParser = require('body-parser');

// specifically parse JSON data  and add it to request.Body object put /post
app.use(bodyParser.json());

app.listen(3000,() =>{
    console.log("hellowww");
})

// router
// here we define get route on app when u are on home page('/')
app.get('/',(request,response)=>{
    response.send("get request , created router");
})

// post request testing by postman app

app.post('/api/cars',(req,res)=>{
    const {name, brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car Submitted Successfully.");
})