const {instance} = require("../config/razorpay");
// const instance = require("../config/razorpay");
const User = require("../model/User");
const Course = require("../model/Course");
const  {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

// capture the payment and initiate the Razorpay order
exports.capturePayment = async(req,res)=>{

    try{
            // get courseId and UserId
            const {courseID} = req.body;
            const userId = req.user.id;
            // validation
            // valid courseId
            if(!courseID){
                return res.staus(403).json({
                    success:false,
                    message:"Please provide valid course ID"
                })
            }
           
            // valid courseDetail
            const course = await Course.findById(course_id);
            if(!course){
                return res.status(403).json({
                    success:false,
                    message:"Could not find the course"
                })
            }
            // user already pay to the same course
            const uid = new  mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(401).json({
                    success:false,
                    message:"Student is already enrolled"
                });
            }
            // order create
            const amount = course.price;
            const currency =  "INR";

            const options = {
                amount:amount*100,
                currency,
                receipt:Math.random(Date.now()).toString(),
                notes:{
                    courseId:courseID,
                    userId
                }
            }

            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            //  // return response
            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:payment
            })

    }catch(error){
        console.log("Error in doing payment",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
// HMAC -> hashing algo + seret_key
// digest -> It is a term used for when we run hashing algo on secret key
            // The result is in hexadecimal 
// verify signature of razorpay and server
exports.verifySignature = async(req,res)=>{
    try{
        const webhooksecret = "12345678";

        const signature = req.header["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256",webhooksecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(signature === digest){
            console.log("Payment is Authorized");

            // When we are creating order we have put userId and courseId
            // in 
            const {courseId, userId} = req.body.payload.payment.entity.notes;
            try{
                // fullfill the action


                // find the course and enroll the student in it
                const enrolledCourse = await Course.findOneAndUpdate(
                                        {_id:courseId},
                                        {
                                            $push:{
                                                studentEnrolled:userId,
                                            }
                                        },
                                        {new:true},
                );
                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:"Course not found",
                    })
                }
    // find the student and add the course to their list enrolled coures
                const enrolledStudent = await User.findOneAndUpdate(
                                    {_id:userId},
                                    {
                                        $push:{courses:courseId},
                                        
                                    },
                    
                                    {new:true},
                )
                console.log(enrolledStudent);
                // mail send krdo confirmation ka
                const emailResponse = await mailSender(
                    enrolledStudent.email,
                    "Congratulation from Edu-tech",
                    `Congratulation, You have enrolled in this ${enrolledCourse.courseName} course`,
                );

                return res.status(200).json({
                    success:false,
                    message:"Signature Verified",
                })
            }catch(error){
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message,
                })
            }

        }
        else{
            return res.status(400).json({
                    success:false,
                    message:error.message,
            })
        }

         

    }catch(error){
        console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message,
                })
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}
