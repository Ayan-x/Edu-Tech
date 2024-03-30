const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");


// auth
exports.auth = async(req,res,next)=>{
    try{
        // Extract Token
        const token = req.cookies.token
                        || req.body.token
                        || req.header("Authorization").replace("Bearer ","");
        // if token missing, then return response
        if(!token){
            return res.status(403).json({
                success:false,
                message:"Token is missing"
            })
        }

        // Validation
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(err){
            // Verifiaction Issue
            return res.status(401).json({
                success:false,
                messagse:"token is invalid"
            })

        }
        next();
    }catch(error){
        console.log("Error while Authorization",error);
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token'
        })
    }
}



// isStudent
exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"protected route for student"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not verified"
        })
    }
}


// isInstructor
exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"protected route for Instructor"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not verified"
        })
    }
}



// isAdmin
exports.isAdmin = async(req,res,next)=>{
    try{
        console.log("Printing AccountType ", req.user.accountType);
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"protected route for Admin"
            })
        }
        next();

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role is not verified"
        })
    }
}