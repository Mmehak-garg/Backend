// import 

const Post = require("../models/postModel");
const Comment = require("../models/commenrModel");

//business logic

exports.createComment = async (req,res)=>{
    try{
        //fetch data from req body 
        const {post,user,body} = req.body;
        
        // create a comment object 
        const comment = new Comment({
            post,user,body
        });

        // save the new comment  into db

        const savedComment = await comment.save();

        // change in post 
        // find teh post by id , and the new comett to its commet array 
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments:savedComment._id}} , {new:true})
                                .populate("comments") // populate the comments array with comment document 
                                .exec();
        res.json({
            post:updatedPost,
        });

    }
    catch(error){
        return res.status(500).json({
            error:"Error while creating comments"
        })
    }
}