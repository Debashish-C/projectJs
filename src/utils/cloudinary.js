import { v2  as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECTRET
});




const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload the file on cloudinary
       const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })
        // filehas been uploaded successfully
        // console.log("file is Uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)  //remove the locally saved temporary file
        // as the upload is fail
        return null;
    }
}


export { uploadOnCloudinary }







