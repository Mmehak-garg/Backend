// import 

const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//business logic

exports.likePost = async (req,res)=>{
    try{
        //fetch data from req body 
        const {post,user} = req.body;
        
        // create a like object 
        const like = new Like({
            post,user,
        });

        // save the new like  into db

        const savedliked = await like.save();

        // change in post 
        // find teh post by id , and the new comett to its commet array 
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes:savedliked._id}} , {new:true})
                                .populate("likes") // populate the comments array with comment document 
                                .exec();
        res.json({
            post:updatedPost,
        });

    }
    catch(error){
        return res.status(500).json({
            error:"Error while  doing likes"
        })
    }
}

//unlike the post
exports.unlikePost = async (req,res)=>{
    try{
        //fetch data from req body 
        const {post,like} = req.body;
        
        const deleteLike = await Like.findOneAndDelete({ post: post, _id: like });
        if (!deleteLike) {
            return res.status(404).json({
                error: "Like not found"
            });
        }

        // change in post 
        // find teh post by id , and the new comett to its commet array 
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { likes: deleteLike._id } },
            { new: true } // Return the updated document
        );
                                                        // .populate("likes") // populate the comments array with comment document 
                                                        // .exec();
        res.json({
            post:updatedPost,
        });

    }
    catch(error){
        return res.status(500).json({
            error:"Error while  doing unlike"
        })
    }
}
