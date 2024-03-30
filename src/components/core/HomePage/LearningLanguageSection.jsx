import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"
const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px]'>
    <div className='flex flex-col items-center gap-5'>
      <div className='flex flex-row text-3xl  text-center font-bold gap-2'>
        <div>You Swiss Knife for </div>
        <HighlightText text={"learning any language"}></HighlightText>
      </div>
      <div className='text-richblack-600  font-weight-550 mx-auto text-center  
        text-base w-[80%]'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, 
        progress tracking, custom schedule and more.
        </div>
        <div className='flex flex-row items-center justify-center mt-5'>
          <img src={know_your_progress}  alt=''
                className='object-contain -mr-32' 
          />
          <img src={compare_with_others}  alt=''
                 className='object-contain ' 
          />
          <img src={plan_your_lessons}  alt='' 
                 className='object-contain -ml-36'
          />
        </div>

        <div className='w-fit pb-10'>
          <CTAButton active={true} linkto={"/signup"}>
            <div>
              Learn More
            </div>
          </CTAButton>
        </div>

    </div>
    </div>
  )
}

export default LearningLanguageSection