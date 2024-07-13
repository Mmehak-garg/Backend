const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () =>{
    mongoose.connect(process.env.DATABASE_URL,{

    })
    .then(console.log("DB connect Successfully"))
    .catch((error) =>{
        console.log("Db connected issuse");
        console.log(error);
        process.exit(1);
    })
};
module.exports = connectWithDb;