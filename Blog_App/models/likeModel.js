const mongoose = require("mongoose");

// router handlers 
 const likeSchema = mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        id:"post"
    },
    user:{
        type:String,
        require:true,
    },
 });

 // exports

 module.exports = mongoose.model("Like",likeSchema);