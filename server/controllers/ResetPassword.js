const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Reset Password Token
exports.resetPasswordToken = async(req,res)=>{
    try{
        // get email from req body
        const {email} = req.body;
        // Email validation
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success:fail,
                message:"User not registered"
            })
        }

        // generate token
        const token = crypto.randomUUID();

        // update user by adding token and expiration time
        const updatedetails = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*1000
            },
            // new:true ->Return updated document
            {new:true}
        )

        // Create Url
        const url = `http://localhost:3000/update-password/${token}`;
        // Send mail containing the url
        await mailSender(email,
                    "Password Reset",
                    `Link for reset password ${url}`);
        

        // Return response
        return res.status(200).json({
            success:true,
            message:"Password Reset token sent successfully",
            token
        })





    }catch(error){
        console.log("Error in Forgot Password",error);
        return res.status(401).json({
            success:fail,
            message:"Something went wrong while reseting password",
        })

    }
}

// Reset Pasword
exports.resetPassword = async(req,res)=>{
    try{
        //data fetch
        const{password,confirmPassword,token} = req.body;

        // Validation
        if(password !== confirmPassword){
            return res.status(403).json({
                success:false,
                message:"Password are not matching"
            })
        }

        // get userDetails from db using token
        const user = await User.findOne({token:token});

        // If no entry - invalid token 
        if(!user){
            res.status(403).json({
                success:false,
                message:"Token is invalid"
            })
        }

        // token time check
        if(user.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token Expires, Please Regenerate again"
            })
        }


        // hash password
        const hashedPassword = await bcrypt.hash(password,10);


        const updatePassword = await User.findByIdAndUpdate(
            {_id:user.id},
            {password:hashedPassword},
            {new:true},
        )

        return res.status(200).json({
            success:true,
            message:"Password reset Successfully",
            updatePassword
        })


    }catch(error){
        console.log("Error in doing",error);
        res.status(400).json({
            success:false,
            data:"Error in doing Reset Password"
        })
    }
}