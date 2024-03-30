import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner1.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from '../components/core/HomePage/instructorSection';

const Home = () => {
  return (
    <div>
        {/* SECTION 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center 
        text-white justify-between max-w-maxContent'>
            {/* Become a Instructor Button */}
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold 
                text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                     {/* Apply Shadow */}
                    <div className='flex flex-row items-center gap-2 rounded-full 
                    px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight></FaArrowRight>
                    </div>
                </div>
            </Link>
            {/* Heading */}
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower your future with
                <HighlightText text={"Coding Skills"} />
                
            </div>
            {/* SUB HEADING */}
            <div className='w-[70%] text-center mt-4 font-lg font-bold text-richblack-300'>
                With our online courses, you can learn at your own pace,
                from anywhere in the world and get access to a wealth of
                resources, including hands-on project, quizzes, and personalized
                feedback of instructors.
            </div>
            {/* CTA BUTTONs */}
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a demo
                </CTAButton>
            </div>
            {/* Video */}
            <div data-aos="flip-right"className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            muted
            loop
            autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
            </div>
            {/* Code section 1 */}
        
            <div>
                <CodeBlocks position={"lg:flex-row"}
                heading={
                    <div className=' text-4xl'>
                        Unlock your 
                        <HighlightText text={"coding potential"}/> with 
                        <br/>
                        our online courses.
                    </div>
                }
                subheading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={{
                    btnText:"Try it yourself",
                    linkto:"/signup",
                    active:true
                }}
                ctabtn2={{
                    btnText:"Learn more",
                    linkto:"/login",
                    active:false
                }}
                codeColor={"text-yellow-200"}
                codeblock={`import React from "react";\n import CTAButton from "./Button";
                import TypeAnimation from "react-type";
                import { FaArrowRight } from "react-icons/fa";\n
                const Home = () => {\nreturn (\n<div>Home</div>)}\n
                export default Home;`}
                backgroundGradient={"bg-rgb-2-0-36 bg-gradient-to-r from-[#020024] via-[#b8b428]/[0.1] to-[#00d4ff]/[0.5]"}
                />

            </div>
            {/* Code section 2 */}
        
            <div>
                <CodeBlocks position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl'>
                        Start 
                        <HighlightText text={"coding in"}/>
                        <br/>
                        <HighlightText text={"seconds"}/>
                    </div>
                }
                subheading={
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={{
                    btnText:"Continue Lesson",
                    linkto:"/signup",
                    active:true
                }}
                ctabtn2={{
                    btnText:"Learn more",
                    linkto:"/login",
                    active:false
                }}
                codeColor={"text-white"}
                codeblock={`import React from "react";\n import CTAButton from "./Button";
                import TypeAnimation from "react-type";
                import { FaArrowRight } from "react-icons/fa";\n
                const Home = () => {\nreturn (\n<div>Home</div>)}\n
                export default Home;`}
                backgroundGradient={"bg-gradient-radial from-richblack-200 via-blue-200/[0.7] to-richblack-700/[0.09] "}
                />

            </div>
        </div> 
        
        {/* SECTION 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[310px]'>

                <div className='w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto'>
                    <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                Explore full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>
                            Learn More
                        </CTAButton>
                    </div>

                </div>
        </div>

        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col 
        items-center justify-between gap-7'>
            <div className='flex flex-row justify-between gap-5 my-[95px]'>
                <div className='text-4xl font-semibold w-[45%] '>
                    Get the skills you need for a
                    <HighlightText text={"job that is in demand"}></HighlightText>
                </div>
                <div className='flex flex-col gap-10 w-[40%] items-start'>
                    <div className='text-[16px]'>
                    The modern StudyNotion is the dictates its own terms.
                    Today, to be a competitive
                    specialist requires more than professional skills.
                    </div>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                        Learn More
                        </div>
                    </CTAButton>
                </div>

            </div>
            <TimelineSection></TimelineSection>
            <LearningLanguageSection></LearningLanguageSection>

        </div>
        
        </div>

        {/* SECTION 3 */}
        <div className=''>
        <div className='w-11/12 mx-auto max-w-maxContent flex-col
         items-center justify-between gap-8 bg-richblack-900 text-white'>
            <InstructorSection/>

            <h2 className='text-center text-4xl font-semibold mt-10'>
                review from Other Learners</h2>
                {/* Review Slider here */}

        </div>
        </div>
        


        {/* FOOTER*/}

         
    </div>
  )
}
export default Home;
