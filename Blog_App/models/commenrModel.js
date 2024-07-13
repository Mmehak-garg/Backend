const mongoose = require("mongoose");

// route hander 

const commetSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    user:{
        type:String,
        require:true,
    },
    body:{
        type:String,
        required:true,
    }
});
//export

module.exports = mongoose.model("Comment",commetSchema);