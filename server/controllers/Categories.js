const Category = require("../model/Category");

// Create Tag
// Since create Tag is only done by Admin we will use middleware
exports.createCategory = async(req,res)=>{
    try{
        // Fetch the data
        const{name,description} = req.body;
        // Validate the data
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"Fill all the details"
            })
        }
        // Create Db entry
        const categorydetails = await Category.create(
            {
                name:name,
                description:description
            }
        )
        return res.status(200).json({
            success:true,
            message:"Category created Successfully",
            categorydetails
        })

    }catch(error){
        console.log("Error in creating tag",error);
        return res.status(401).json({
            success:false,
            message:"Error in Creating Category"
        })
    }
    
}

// Showing All tags
exports.showAllCategories = async(req,res)=>{
    try{
        // A different way to find details
        const allCategory = await Category.find({},{name:true, description:true});
        res.status(200).json({
            success:true,
            message:"Categories are shown successfully",
            allCategory,
        })
    }catch(error){
        return res.status(200).json({
            success:false,
            message:error.message,
        })
    }
}

// Category Page details
exports.categoryPageDetails = async(req,res)=>{
    try{
        // get category ID
        const {categoryId} = req.body;
        // get courses for specified category ID
        const selectedCategory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found",
            })
        }
        // get courses for different categories
        // ne=>not equal to . this is use to showcase different category
        const differentCategories = await Category.find({
                                _id:{$ne:categoryId},
        })
        // get top selling courses
        // HW - write it on yourn own
        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories  
            }
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}