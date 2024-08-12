// import todo model

const Todo = require("../models/Todo");

// define route handler

exports.updateTodo = async(req,res) =>{
    try{
        //extract title and description from request body
        // destructuring 
        const {id} = req.params; 
        const {title,description}= req.body;
        const todo = await Todo.findByIdAndUpdate(
            {_id: id},//for which id
        {title,description,updatedAt:Date.now()} // what to update 
    );
        // data from given id not found

        if(!todo){
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
                message:`updates successfully`,
            }
        );

    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}
