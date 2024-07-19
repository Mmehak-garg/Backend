// auth isStudent isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();
// use for authN
exports.auth = (req,res, next)=>{
    try{
        // extract JWT token ->head,body , cookie
        console.log(req.body.token);
        console.log("huaguagi");
        console.log(req.cookies.token);
        const token =  req.cookies.token ;// || req.header("Authorization").replace("Bearer","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missiing",
            });
        }

        // verify token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode; // here it store payload in user
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invaild",
            });
        }
        next();

    } catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verify the Token ",
        });
    }
}
// below is used for Authz
exports.isStudent = (req,res,next) =>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is protected router for students",
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role not matched(s) ",
        });
    }
}

exports.isAdmin = (req,res,next) =>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is protected router for Admin",
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role not matched(a) ",
        });
    }
}
