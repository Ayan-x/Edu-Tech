import React from 'react'
import Template from '../components/core/Auth/Template'
import signup from "../assets/Images/signup.webp"
const SignUp = () => {
  return (
    <div>
         <Template 
            title="Join the millions learning to 
            code with StudyNotion for free"
            desc1="Build Skills for today,tommorow, 
            and beyond"
            desc2="Education to future-proof you 
            career."
            img = {signup}
            googleText="Sign Up with Google">

            </Template>
    </div>
  )
}

export default SignUp