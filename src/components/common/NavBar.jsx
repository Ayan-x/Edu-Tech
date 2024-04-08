import React, { useEffect, useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, useLocation } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import {IoIosArrowDropdownCircle} from "react-icons/io"
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis';

const subLinks = [
  {
    title:"python",
    link:"/catalog/python"
  },
  {
    title:"web dev",
    link:"/catalog/web-development"
  },

]

const NavBar = () => {
// TO get the data from the slices we use UseSelector
        const {token} = useSelector((state)=>state.auth);
        const {user} = useSelector((state)=>state.profile);
        const {totalItems} = useSelector((state)=>state.cart);

        // // const [subLinks, setSubLinks] = useState([]);
        // const fetchSublinks = async()=>{
        //   try{
        //     const result = await apiConnector("GET", categories.CATEGORIES_API);
        //     console.log("Printing sublink result ",result);
        //     setSubLinks(result.data.data);
        //   }catch(error){
        //     console.log("Could not fetch the category list")
        //   }
        // }
        // useEffect(()=>{
        //   // fetchSublinks();
        // },[])

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
                    link.title === "Catalog"?(
                    <div className=' relative flex flex-row gap-[5px] group'>
                      <p>{link.title}
                      </p>
                      <IoIosArrowDropdownCircle className='translate-y-[5px] translate-x-[-5%]'/>

                      <div className='invisible absolute left-[50%] top-[50%]
                      translate-x-[-50%] translate-y-[20%]
                      flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                      opacity-0 tranistion-all duration-200 group-hover:visible
                      group-hover:opacity-100 lg:w-[300px]'>
                        
                        <div className='absolute left-[50%] top-0 h-6 w-6
                        translate-x-[65%]
                        translate-y-[-20%] 
                        rotate-45 rounded bg-richblack-5'>

                        </div>
                        {
                          subLinks.length ? ( 
                          subLinks.map((subLink,index)=>(
                                <Link to={`${subLink.link}`} key={index}>
                                  {subLink.title}
                                </Link>
                              ))
                           
                          ):(<div></div>)
                        }

                      </div>


                    </div>):
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
          {
            user && user?.accountType !== "Instructor" && (
              <Link to={"/dashboard/cart"} className='relative'>
                <AiOutlineShoppingCart />
                {
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }
          {
            token === null && (
              <Link to={"/login"}>
                <button className='bg-richblack-800 text-richblack-100 rounded-md
                px-[12px] py-[8px] border border-ricblack-700'>
                  Log In
                </button>
              </Link>
            )
          } 
          {
            token === null && (
              <Link to="/signup">
                <button className='bg-richblack-800 text-richblack-100 rounded-md
                px-[12px] py-[8px] border border-ricblack-700 '>
                  Sign Up
                </button>
              </Link>
            )
          } 
          {
            token !== null && <ProfileDropDown/>
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar