const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:50,
        },
        description:{
            type:String,
            required:true,
            maxLength:50,
        },
        createdAt:{
            type:Date,
            required:true,
            default:DataTransfer.now(),
        },
        updatedAt:{
            type:Date,
            required:true,
            default:DataTransfer.now(),
        }
    }
);


module.exports = mongoose.model("Todo",todoSchema);