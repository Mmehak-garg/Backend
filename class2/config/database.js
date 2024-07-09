const mongoose = require("mongoose");

require("dotenv").config(); // any thing define in env will load into process object


const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true,
    })
    .then(()=>{console.log("db connect sucessfully")})
    .catch((err)=>{
        console.log("not connected");
        console.log(err.message);
        //means
        process.exit(1);
    })
}

module.exports = dbConnect;