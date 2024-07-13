
const Todo = require("../models/Todo");

exports.deleteTodo = async(req,res) =>{
    try{
        //extract title and description from request body
        // destructuring 
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json(
            {
                success:true,
                message:`to-do deleted`,
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