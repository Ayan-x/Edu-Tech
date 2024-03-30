const Course = require("../model/Course");
const Category = require("../model/Category");
const User = require("../model/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// create Course Handler function
exports.createCourse = async(req,res)=>{
    try{
        // fetch data
        const{courseName,courseDescription,learn, price, category} = req.body;

        // get Thumbnail
        const thumbnail = req.files.img;

        // Validation
        console.log(courseName);
        console.log(courseDescription);
        console.log(learn);
        console.log(price);
        console.log(category);
        console.log(thumbnail);
        if(!courseName || !courseDescription || !learn|| !price || !category || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ",instructorDetails);

        if(!instructorDetails){
            return res.staus(404).json({
                success:false,
                message:"Instructor details not found",
            })
        }

        // Check given Tag is valid or not
        const CategoryDetails = await Category.findById(category);
        if(!CategoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category details not found",
            });

        }

        // Upload Image to Cloudinary
        const ThumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            learn:learn,
            price,
            Category:CategoryDetails._id,
            thumbnail:ThumbnailImage.secure_url,

        })

        // add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails.id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        )

        // Update the Tag schema
        await Category.findByIdAndUpdate(
            {_id:CategoryDetails.id},
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true},
        );

        // return response
        return res.status(200).json({
            success:true,
            message:"Course Created Succcessfully",
            data:newCourse
        })




    }catch(error){
        console.log("Error in creating course",error);
        return res.status(401).json({
            success:false,
            message:"error in creating course"

        })
    }
}

// getAlllCourses handler function 
exports.getAllCourses = async(req,res)=>{
    try{
        // 
        const allCourses = await Course.find({},
                                {courseName:true,
                                courseDescription:true,
                            thumbnail:true,
                        instructor:true,
                        ratingAndReview:true,
                    studentEnrolled:true}).populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message:"Data for all courses",
            data:allCourses
        })
 
    }catch(error){
        console.log("Error in accessing all course",error);
        return res.status(401).json({
            sucess:false,
            message:"Not able to fetch the courses",
            error:error.message
        
        })
    }
}

// Get Course Details
exports.getCourseDetails = async(req,res)=>{
    try{
        // get Id
        const {courseId} = req.body;
        // find course details
        const courseDetails = await Course.find(
                        {_id:courseId}
        ).populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                },
            }
        )
        .populate("Category")
        // .populate("ratingAndreviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            })
        }
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:courseDetails
        })

    }catch(error){
        console.log("Error in getting course details",error);
        return res.status(500).json({
            success:false,
            message:error.message 
        })
    }
}
