import React from 'react'
import Template from '../components/core/Auth/Template'
import login from "../assets/Images/login.webp"
const Login = () => {
  return (
    <div>
            <Template 
            title="Welcome Back"
            desc1="Build Skills for today,tommorow, 
            and beyond"
            desc2="Education to future-proof you 
            career."
            img={login}
            googleText="Log In with Google">

            </Template>
    </div>
  )
}

export default Login