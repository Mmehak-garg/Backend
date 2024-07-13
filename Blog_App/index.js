const express = require("express");
const app = express();

// app.listen(3000,()=>{
//     console.log("server started");   
// })

// app.get("/",(req,res)=>{
//    res.send(`<h1>Home page</h1>`)
// })

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middlewaers

app.use(express.json());

const blog = require("./routes/blog");

//mount 
app.use("/api/v1",blog);

const connectWithDb = require("./config/database");
connectWithDb();

// server start
app.listen(PORT,()=>{
    console.log(`app started at ${PORT}`)
})

app.get("/",(req,res)=>{
   res.send(`<h1>Home page OF BLOG APP</h1>`)
})