const cloudinary = require("cloudinary").v2;
const fs = require("fs");


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
 

    const uploadOnCloudinary = async (localFilePath) => {
        try {
            if(!localFilePath){
                return null 
            }
            //Upload file on Cloudinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type : "auto"
            })
            console.log("File is successfully uploaded on Cloudinary", response.url);
            fs.unlinkSync(localFilePath) //unlink filePath from our server not from cloudinary
             return response;          
            
        } catch (error) {
            fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
            return null;
            
        }

    }

    module.exports = uploadOnCloudinary;