const Course = require("../model/Course");
const Profile = require("../model/Profile");
const User = require("../model/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.updateProfile = async(req,res)=>{
    try{
        // get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        // get user id
        const id = req.user.id;
        // validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"Fill all the details",
            });
        }
        // find 
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        
        // Update Details through a new method
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about,
        profileDetails.gender = gender,
        profileDetails.contactNumber = contactNumber
        await profileDetails.save();
        
        // return response
        return res.status(200).json({
            success:false,
            message:"Profile got updated",
            profileDetails,
        })


    }catch(error){
        console.log("Error in Updating Profile",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}
// Explore- how can we schedule account to delete account, crone job
exports.deleteAccount = async(req,res)=>{
    try{
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        // delete Profile
        const profileId = userDetails.additionalDetails;
        const deleteProfile = await Profile.findByIdAndDelete(profileId);
        //H.W. How to delete name of account from student enrolled??
        const coursesId = userDetails.courses;
        const courses = await Course.findById(coursesId);
        if (!courses) {
            return res.status(404).json({ message: 'Course not found' });
        }
        courses.studentEnrolled.pull(id);
        await courses.save();


        // delete user
        const deletedUser = await User.findByIdAndDelete(id);
        // return response
        return res.status(200).json({
            success:false,
            message:"Account deleted Successfully"
        })

    }catch(error){
        console.log("Error in Deleting Profile",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}
// Get all details of User
exports.getAllUserDetail = async(req,res)=>{
    try{
        // get id
        const id = req.user.id;
        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Got User details successfully",
            userDetails,
        })

    }catch(error){
        console.log("Error in Accessing Profile",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.updateDisplayPicture = async(req,res)=>{
    try{
        const pic = req.files.pic;
        const userId = req.user.id;

        const image = await uploadImageToCloudinary(
            pic,process.env.FOLDER_NAME,1000,1000
        )

        const updated = await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true},
        )
        return res.status(200).json({
            success:true,
            message:"Image has been uploaded",
            updated
        })

    }catch(error){
        console.log("Error in uploading image",error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}