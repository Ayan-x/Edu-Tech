const Section = require("../model/Section");
const Course = require("../model/Course");
const SubSection = require("../model/SubSection");
const { findById } = require("../model/User");

exports.createSection = async(req,res)=>{
    try{
        // data fetch
        const{sectionName,courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:"Fill all the details"
            })
        }
        // create section
        const section = await Section.create({
            sectionName,
        })
        console.log(section.id);
        // Update course with section ObjectId
        const updateCourseDetails = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    courseContent:section._id,
                }
            },
            {new:true}
        ).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();
        // return response
        return res.status(200).json({
            success:true,
            message:'Section created Successfully',
            updateCourseDetails
        })

    }catch(error){
        console.log("Error in doing Creating Section",error);
        return res.status(401).json({
            success:false,
            message:"Error in creating section",
            data:error.message,
        })
    }
}


exports.updateSection = async(req,res)=>{
    try{
        // data input
        const{sectionName,sectionId} = req.body;
        // data validation
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
                message:"Fill all details"
            })
        }

        // update the data
        
        const updateSectionDetails = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {sectionName:sectionName},
            {new:true}
        )
        // return response
        return res.status(200).json({
            success:true,
            message:"Section got updated",
            updateSectionDetails
        })


    }catch(error){
        console.log("Error in updating data",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        }) 
    }
}

exports.deleteSection = async(req,res)=>{
    try{
        // get ID
        const {sectionId,courseId} = req.body;

        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull:{
                    courseContent:sectionId,
                }
            }
        )
        const section = await Section.findById(sectionId);
        // delete subSection
        await SubSection.deleteMany(
            {_id:{$in:section.subSection}}
        )
        // delete it by findbyId and delete
        const deletedSection = await Section.findByIdAndDelete(sectionId);
        // TODO-: Do we need to delete ID from course Schema
        // find the updated course and return
        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"Section deleted",
        })
    }catch(error){
        console.log("Error in deleting section");
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}