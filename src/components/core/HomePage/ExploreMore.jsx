import React from 'react'
import { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'
const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]


const ExploreMore = () => {

    const[currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const[currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);


    const setMyCards = (value)=>{
      setCurrentTab(value);
      const result = HomePageExplore.filter((course)=> course.tag === value);
      setCourses(result[0].courses);
      setCurrentCard(result[0].courses[0].heading);

    }
  return (
    <div className='flex flex-col items-center'>
        <div className='text-4xl font-semibold text-center'>
          Unlock the 
          <HighlightText text={"Power of Code"}></HighlightText>
        </div>
        <div className='text-center text-richblack-300  font-medium mt-3'>
         Learn to Build Anything You Can Imagine
        </div>
        
        <div className='flex flex-row bg-richblack-800 rounded-full mt-5 mb-5 border-richblack-100
          p-1 '>
          {
            tabsName.map((element,index)=>{
              return(
                  <div className={`text-[16px] flex flex-row items-center gap-2
                  ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium":
                  "text-richblack-200 "} rounded-full transition-all duration-200 
                  cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-5 py-2`}
                  key={index}
                  onClick={()=>setMyCards(element)}>
                    {element}
                  </div> 
              )
            })
          }
        </div>
        <div className='
         flex flex-row gap-10 justify-between w-full'>
          {
            courses.map((element, index)=>{
              return(
                <div className=''>
                  <CourseCard
                  key={index}
                  cardData = {element}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                  />  
                </div>
              )
            })
          }
        </div>

    </div>
  )
}

export default ExploreMore