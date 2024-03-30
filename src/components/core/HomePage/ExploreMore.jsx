import React from 'react'
import { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
const tabsName = [
    "Free",
    "new to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
]


const ExploreMore = () => {

    const[currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const[currentCar, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);


    const setMyCards = (value)=>{
      setCurrentTab(value);
      const result = HomePageExplore.filter((course)=> course.tag === value);
      setCourses(result[0].courses);
      setCurrentCard(result[0].courses[0].heading);

    }
  return (
    <div className='flex flex-col items-center'>
        <div >
          Unlock the 
          <HighlightText text={"Power of Code"}></HighlightText>
        </div>
        <div>
         Learn to Build Anything You Can Imagine
        </div>

    </div>
  )
}

export default ExploreMore