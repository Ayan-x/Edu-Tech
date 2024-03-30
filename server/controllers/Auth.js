const User = require("../model/User");
const OTP = require("../model/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../model/Profile");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 
const mailSender = require("../utils/mailSender");    
require("dotenv").config();


// sendOTP
exports.sendOTP = async(req,res)=>{
    try{
        // fetch email from request ki body
        const{email} = req.body;

        // Checking user is not registered
        const checkEmail = await User.findOne({email});

        // If user already exist
        if(checkEmail){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            })
        }
        // Generating OTP
        const otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log("OTP:",otp);
        // Checking OTP is random - but bad practice industry wise
        let otpResult = await OTP.findOne({otp:otp});
        while(otpResult){
            const otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            otpResult = await OTP.findOne({otp:otp});
        }
        // Creating an entry for otp
        const otpPayload = {email,otp};
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return response successful
        res.status(200).json({
            success:true,
            message:"OTP Sent successfully",
            data:otp,
        })
        

    }catch(error){
        console.log("Error in sending OTP",error);
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }

    
}

// Login
exports.login = async(req,res)=>{
    try{
        // fetch email and password
        const{email,password} = req.body;

        // check email is valid or not 
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All field are required"
            })
        }




        // Check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered, Please do signup"
            })
        }


        // compare password through bcrypt library
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
        // generate JWT
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token = token;
            user.password = undefined;

            // Create cookie and send response 
            const options = {
                expires:new Date(Date.now()+3*24*60*60*1000)
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Login Successful"
            })
            

        }else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            })
        }


    }catch(error){
        console.log("Error in doing login",error)
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// Signup
exports.signUp = async(req,res)=>{
    try{
        // fetch data from request ki body
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp} = req.body;

        // Validate Karlo
        if(!firstName 
            || !lastName 
            || !email 
            || !password 
            || !confirmPassword
            || !otp){
                return res.status(403).json({
                    success:false,
                    message:"All fields are required",
                })
            }
        // Checking user is not registered
        const checkEmail = await User.findOne({email});

        // If user already exist
        if(checkEmail){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            })
        }
        // 2 password match karlo
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Pasword and Confirm Password don't matched"
            })
        }

        // find most recent OTP stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);

        // validate OTP
        if(recentOtp.length == 0){
            // OTP not found
            return res.status(400).json({
                success:false,
                message:"OTP not found",
            })
        }else if(otp !== recentOtp[0].otp){
            // Invalid OTP
            return res.status(400).json({
                success:false,
                messagse:"Invalid OTP"
            })
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password,10);

        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        // Entry in DB
        const profileDetails = await Profile.create({
            gender:null,
            datseOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const userDetails = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            approved:approved,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`
        })

        // Return Response
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            data:userDetails,
        })



    }catch(error){
        console.log("Error in doing signUp",error);
        res.status(500).json({
            success:false,
            message:"User cannot be registered",
            data:error.message,

        })
    }

}

// changePassword
exports.changePassword = async(req,res)=>{
    try{
        // Fetch Email
        const{email,oldpassword,newpassword,confirmnewpassword} = req.body;
        
        // Get  oldpassword,new password, confirmnewPassword
        if(!email || !oldpassword || !newpassword || !confirmnewpassword){
            return res.status(403).json({
                successs:false,
                message:"All field required"
            })
        }

        // Validation 
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                successs:false,
                message:"User not registered",
            })
        }
        if (oldpassword !== user.password){
            return res.status(403).json({
                success:false,
                message:"Please give correct old password"
            })
        }
        if(newpassword !== confirmnewpassword){
            return res.status(403).json({
                success:false,
                message:"Password don't match"
            })
        }

         // Hash Password
         const hashedPassword = await bcrypt.hash(newpassword,10);

        // Password Update in DB
        const updatePassword = await User.findByIdAndUpdate(
            {_id:user.id},
            {password:hashedPassword},
        )
        
        // Send mail -Password Updated
        await mailSender(email,"Password Change","Your password has changed succesfully");
        return res.status(200).json({
            success:true,
            message:"Password Change",
            updatePassword
        })

    }catch(error){
        console.log("Error in changing password",error);
        return res.status(500).json({
            success:false,
            message:"Server side error"
        })
    }
}
