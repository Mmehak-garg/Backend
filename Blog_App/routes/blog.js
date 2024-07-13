const express = require("express");
const router = express.Router();

// import controllers

const {likePost, unlikePost} = require("../controllers/LikeController");
const {createComment} = require("../controllers/commentController");
const {createPost, getAllPosts} = require("../controllers/PostController")
//mapping 

// router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.delete("/likes/unlike",unlikePost);



// export
module.exports = router;