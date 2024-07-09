// import todo model

const Todo = require("../models/Todo");

exports.getTodo = async(req,res) =>{
    try{

        // fetch all todo items from database
        const todos = await Todo.find({});
        //response
        res.status(200).json(
            {
                success:true,
                data:todos,
                message:"entire data fetch done",
            }
        );

    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:"internal server error",
        })
    }
}


exports.getTodoById = async(req,res) =>{
    try{
        // fetch  todo items from database on basis of id
        //await as database intraction
        const id = req.params.id;
        const todo = await Todo.findById({_id: id});
        // data from given id not found

        if(!404){
            return res.status(404).json({
                success:false,
                message:"no data with this id",
            })
        }
        //response ->data found
        res.status(200).json(
            {
                success:true,
                data:todo,
                message:`entire data at ${id} fetch done`,
            }
        );

    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:"internal server error",
        })
    }
}