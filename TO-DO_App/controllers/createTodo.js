// import todo model

const Todo = require("../models/Todo");

// define route handler

exports.createTodo = async(req,res) =>{
    try{
        //extract title and description from request body
        // destructuring 
        const {title,description} = req.body;
        // create new todo Obj and insert in db
        const response = await Todo.create({title,description});
        // send json response with a sucess flag 
        res.status(200).json(
            {
                success:true,
                data:response,
                message:"Enter done",
            }
        );

    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}
