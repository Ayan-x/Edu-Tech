import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, useLocation } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { matchPath } from 'react-router-dom'
const NavBar = () => {
  // I want to know about this
  // useLoaction -> use to take location from url
  // matchPath is inbuilt function of to match path
        const location = useLocation();
        const matchRoute = (route) =>{
          return matchPath({path:route}, location.pathname);
        }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px]
    border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/">
          <img src={logo} width={160} height={42} alt="" loading='lazy' />
        </Link>
        {/* Nav Links */}
        <nav>
          <ul className='flex gap-x-6 text-richblack-25'>
            {
              NavbarLinks.map((link,index)=>{
                return(<li key={index}>
                  {
                    link.title === "Catalog"?(<div></div>):
                    (
// ? is a optional chaning operator  
// If link is not null or undefined:
// link?.path evaluates to the value of link.path.
// If link is null or undefined:
// link?.path evaluates to undefined, without throwing an error.
                    <Link to={link?.path}>
                      <p className={`${matchRoute(link?.path) ? "text-yellow-25":
                    "text-richblack-25"}`}>
                        {link.title}
                      </p>
                    </Link>
                      )
                  }
                </li>)
              })
            }
          </ul>
        </nav>
        {/* Login/Signup/Dashboard */}
        <div className='flex gap-x-4 items-center'>
          <Link to={"/login"}>
            
           </Link> 
        </div>
      </div>
    </div>
  )
}

export default NavBar