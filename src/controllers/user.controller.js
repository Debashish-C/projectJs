import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse }  from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req,res) => {
    // res.status(200).json({
    //     message : "ok"
    // })

    // get user details from frontent
    // validation - not empty
    // check if user already exist : username/email
    // check for images
    // check for avatar
    // upload them to cloudinery
    // create user object --create entry in db
    // remove password and refreshtoken field from response
    // check for usercreation
    // return res

   const {fullname, email, username, password, }  = req.body
   console.log("email : ", email);

//    if( fullname === ""){
//     throw new apiError(400, "full name required");
//    }

if(
    [fullname, email, username, password].some((field) => field?.trim() === "")){
        throw new apiError(400, "All Field Are Compulsory And Required !!")
    }


const existedUser  = await User.findOne({
    $or: [{ email }, { username }]
})

if(existedUser){
    throw new apiError(409, "User With email or username already exist !")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
// const coverImagelocalPath = req.files?.coverImage[0]?.path
let coverImagelocalPath;
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage
.length > 0){
    coverImagelocalPath : req.files?.coverImage[0].path;
}


if(!avatarLocalPath){
    throw new apiError(401, "Avatar File is Required !")
}

const avatar =  await uploadOnCloudinary(avatarLocalPath);
const coverImage = await uploadOnCloudinary(coverImagelocalPath)

if(!avatar){
    throw new apiError(401, "Avatar File is Required !")
}

await User.create({
    fullname, avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()
})

   const createdUser = await User.findById(User._id).select("-password -refreshToken")

    if(!createdUser){
        throw new apiError(500, "Something went wrong while registering the user.. !")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully !")
    )
})
export { registerUser } 