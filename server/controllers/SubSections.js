const Section = require("../model/Section");
const SubSection = require("../model/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// Create SubSection

exports.createSubSection = async(req,res)=>{
    try{
        // data fetch
        const{sectionId, title, timeDuration, description} = req.body;
        // extract file / vedio
        const vedio = req.files.vedio;  
        // validate
        if(!sectionId || !title || !timeDuration || !description || !vedio){
            return res.status(400).json({
                success:false,
                message:"Fill all the details",
            })
        }
        // upload vedio to cloudinary
        const uploadDetails = await uploadImageToCloudinary(vedio, process.env.FOLDER_NAME);
        
        // create a sub section
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            vedioUrl:uploadDetails.secure_url,
        })

        // upload section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{
                    subSection:SubSectionDetails._id,
                }
            },
            {new:true}
        ).populate("subSection").exec();
        // return response
        return res.status(200).json({
            success:false,
            message:"Sub Section Created Successfully",
            updatedSection
        })

    }catch(error){
        console.log("Error in Creating Sub Section",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.updateSubSection = async(req,res)=>{
    try{
        // data fetch
        const {title,timeDuration,description,subSectionId} = req.body;
        // Extract vedio and upload it to cloudinary
        const vedio = req.files.vedioFile;
        const vedioUrl = await uploadImageToCloudinary(vedio,process.env.FOLDER_NAME);
        // data validate
        if(!title || !timeDuration || !description || !subSectionId || !vedio){
            return res.status(401).json({
                success:false,
                message:"Fill all the details"
            })
        }
        // update data by ID
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title:title,
                timeDuration:timeDuration,
                description:description,
                vedioUrl:vedioUrl.secure_url,
            },
            {new:true},
        )
        // return response
        return res.status(200).json({
            success:true,
            message:"Sub Section got updated",
            updatedSubSection,
        })


    }catch(error){
        console.log("Error in Updating Sub Section",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.deleteSubSection = async(req,res)=>{
    try{
        const{subSectionId} = req.body;

        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success:true,
            message:"Section got deleted successfully"
        })

    }catch(error){
        console.log("Error in Deleteing Sub Section",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

