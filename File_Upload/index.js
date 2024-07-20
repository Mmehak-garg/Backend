// app connect 
const express = require("express");
const fileupload = require("express-fileupload");
const app = express();

//port
require("dotenv").config();
const PORT = process.env.PORT || 3000;
 
// middleware add krne h
app.use(express.json());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// db se connect 
const db = require("./config/database");
db.connect();
// cloud se connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
// api route mount krna h
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload',Upload);

// activate server
app.listen(PORT,() => {
    console.log(`app is listening at ${PORT}`)
})