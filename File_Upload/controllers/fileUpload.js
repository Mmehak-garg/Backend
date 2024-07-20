const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
//localfileupload -> handler function

exports.localFileUpload = async (req,res) =>{
    try {
        // fetch file 
        const file = req.files.file;
        //path 
        let path = __dirname + "/files/" + Date.now()+`.${file.name.split('.')[1]}`;

        file.mv(path,(err)=>{
            console.log(err);
        });
        res.json({
            success:true,
            message:'Local File Uploaded SuccessFully',
        })
    }
    catch(error){
        console.log(error);
    }
}

//upload image 
function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}
async function uploadFileCloudinary(file, folder,quality){
    const options = {folder};
    options.resource_type = "auto";
    if(quality){
        options.quality = quality;
    }
   return  await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload= async (req,res) =>{
    try{
        // data fetch
        const { names,tags,email} = req.body;
        console.log(names,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // validation

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format not Supported",
            })
        }
        // File Format Supported

        const response = await uploadFileCloudinary(file,"Mehak");
        console.log(response);

        // save to db
        const fileData = await File.create({
            names,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            meassage:"Image uploding done",
        });


    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            meassage:"something went wrong while Image uploding",
        });
    }
}

exports.videoUpload= async (req,res) =>{
    try{
        // data fetch
        const { names,tags,email} = req.body;
        console.log(names,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        // validation

        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format not Supported",
            })
        }
        // ADding size limit
        // File Format Supported

        const response = await uploadFileCloudinary(file,"Mehak");
        console.log(response);

        // save to db
        const fileData = await File.create({
            names,
            tags,
            email,
            videoUrl:response.secure_url,
        })
        res.status(200).json({
            success:true,
            videoUrl:response.secure_url,
            meassage:"video uploding done",
        });


    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            meassage:"something went wrong while video uploding",
        });
    }
}
exports.imageReducerUpload = async (req,res) =>{
    try{
        // data fetch
        const { names,tags,email} = req.body;
        console.log(names,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        // validation

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"File Format not Supported",
            })
        }
        // File Format Supported

        const response = await uploadFileCloudinary(file,"Mehak",90);
        console.log(response);

        // save to db
        const fileData = await File.create({
            names,
            tags,
            email,
            imageUrl:response.secure_url,
        })
        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            meassage:"Image uploding done",
        });


    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            meassage:"something went wrong while Image uploding",
        });
    }
}
