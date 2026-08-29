import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js";
import {User, user} from "../models/user.model.js";
import {upoadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res) => {

    //get uuser details from frontend

    const {fullname, username, email, password} = req.body
    console.log("email:", email);

    //validation - not empty

    // if( fullname === ""){ //for one by one 
    //     throw new ApiError(400, "fullName is required")
    // }

    if(
        [fullname, email, password, username].some((field) => field?.trim() == "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    //check if user is already exist - username, email

    const existedUser = User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, "User is already exist")
    }

    //check for images, check for avatar

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    //upload them cloudinary , avatar

    const avatar = await upoadOnCloudinary(avatarLocalPath)
    const coverImage = await upoadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar is required")
    }

    //create object - create entry in db

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverImage.url || "",
        email,
        password,
        username: tolowercase()
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"  //remove password and refreshToken filed from respnse
    )
    
    //check for user creation

    if(!createdUser){
        throw new ApiError(500, "user is not created!!")
    }

    //return res

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered successfully")
    )


})

export {registerUser}