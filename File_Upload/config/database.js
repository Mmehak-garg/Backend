const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{})
    .then(console.log("Db connect Successfuly"))
    .catch((error)=>{
        console.log("Db connection issue ");
        console.log(error);
        process.exit(1);
    });
}