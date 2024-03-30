import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
const instructorSection = () => {
  return (
    <div className='flex flex-row gap-10 ml-5 pl-5'>
        <div className='w-[50%] '>
            <img src={Instructor} alt="" 
            className='shadow-blue-200 mt-16 shadow-[5px_-2px_25px_-5px] '/>
        </div>
        <div className='flex flex-col gap-10 items-start mt-52 ml-4 w-[50%]'>
            <div className='text-4xl font-semibold '>
                Become An<br/>
                <HighlightText text={"Instructor"}></HighlightText>
            </div>
            <div className='text-richblack-200 font-medium text-[16px] w-[80%]'>
            Instructors from around the world teach millions of students on StudyNotion. 
            We provide the tools and skills to teach what you love.
            </div>
            <div className=''>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>Start teaching today
                        <FaArrowRight/>
                    </div>  
                    </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default instructorSection