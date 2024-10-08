const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
// const { options } = require("../routes/user");
require("dotenv").config();

// signup router handler

exports.signup = async (req,res) =>{
    try{
        // get data
        const {name,email,password,role } = req.body;
        // check if user already exist 
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exits",
            })
        }

        // secure password
        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(400).json({
                success:false,
                message:"Error in Hashing Pasword",
            });
        }

        // create entry for user in db
        const user = await User.create({
            name,email,password:hashedPassword,role
        })
        return res.status(200).json({
            success:true,
            message:"User created",
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be register, please try later"
        });
    }
}

// handler for login

exports.login = async (req,res) => {
    try {

        //data fetch
        const {email, password} = req.body;
        //validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }
        // is user is reqister
        let user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };
        // verify password and generate JWT token
        if(await bcrypt.compare(password,user.password) ) {
            //password match
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

                                

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 30000),
                httpOnly:true,
            }

            res.cookie("babbarCookie", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });
            // no cookie passed 
            // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:'User Logged in successfully',
            // });
        }
        else{
            // password nowt matched 
            return res.status(403).json({
                success:false,
                message:"incorrect password",
            });
        }


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be loggin , please try later"
        });
    }
}

