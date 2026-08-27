import { v2 as cloudinary } from "cloudinary";
import { response } from "express";

import fs from "fs"; //fs (file system)  that use unlink for delete file/image/video from temporary file after upload clodinary

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const upoadOnCloudinary = async (localFilePath) => {
        try{
            if(!localFilePath) return null
            //upload the file on clodinary
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto"
            })
            //file has been uploaded suuccesfuly
            console.log("file is uploaded on clodinary", response.url);
            return response
        } catch (error){
            fs.unlinkSync(localFilePath) // remove the localy saved file as the upload operation got failed
            return null;
        }
    }

    export {upoadOnCloudinary}