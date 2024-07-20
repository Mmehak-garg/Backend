const mongoose = require("mongoose");
const nodemailer= require("nodemailer");

require("dotenv").config();

const fileSchema = new mongoose.Schema({
    names:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});
//post middleware

fileSchema.post("save", async function(doc){
    try{
        console.log("Doc",doc);

        //transporter make this config floder
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
        });

        //send mail
        let info = await transporter.sendMail({
            from:'mehak',
            to:doc.email,
            subject:"new file uploaded on cloudinary",
            html:`<h2>hello,nia this side</h2> <p>file is uploaded by me  View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        })
        console.log(info);
    }
    catch(error){
        console.log(error);
    }
})
const File = mongoose.model("File", fileSchema);
module.exports = File;