const RatingAndReview = require("../model/RatingandReview");
const Course = require("../model/Course");
const  mongoose  = require("mongoose");

// create Rating 
exports.createRating = async(req,res)=>{
    try{
        // get user id
        const userId = req.user.id;
        // get data from request
        const{rating,review,courseId} = req.body;
        // check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {
                                        _id:courseId,
                                        studentEnrolled:{$elemMatch:{$eq:userId}},
                                    }
        );
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in course",
            })
        }
        // check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                    user:userId,
                                    course:courseId,
        })
        if(!alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user.",
            })
        }
        // create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,review,course:courseId,user:userId,
        });

        // update course with this rating/review
        await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push:{
                                            ratingAndReview:ratingReview._id,
                                        }
                                    },
                                    {new:true},)
        // return response
        return response.status(200).json({
            success:true,
            message:"Rating and Review created Successfully"
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
            
        })
    }
}

// get Average rating
exports.getAverageRating = async(req,res)=>{
    try{
        // get course Id
        const courseId = req.body.courseId;
        // caclculate avg rating
        
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},

                }
            }
        ])

        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        } 

        // If no rating/ review exist
        return res.status(200).json({
            success:true,
            message:"Average Rating id 0, no ratings give till now",
            averageRating:0,
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// get all rating  and review
exports.getAllRating = async(req,res)=>{
    try{
    
        const allReviews = await RatingAndReview.find({})
                                .sort({rating:"desc"})
                                .populate({
                                    path:"user",
                                    select:"firstNaem lastName email image"
                                })
                                .populate({
                                    path:"course",
                                    select:"courseName",
                                }).exec();

        return res.status(200).json({
            success:true,
            message:"All rating and review are fetched successfully",
            allReviews,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}



