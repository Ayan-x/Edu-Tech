import React from 'react'

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
    const clickHandler = ()=>{
        setCurrentCard(cardData.heading)
    }
  return (
    <div className='translate-y-[50px] mx-5'>
        <div className={`flex flex-col gap-5 p-3 
        ${cardData.heading === currentCard ? "bg-white text-richblack-400":
        "bg-richblack-800 text-richblack-5"}
        `}
        onClick={clickHandler}>
            <div className='border-b-[2px] border-dashed border-spacing-2 border-gray-500 flex flex-col gap-5'>
            <div className='text-xl font-bold'> 
            {cardData.heading}
            </div>
            <div className='text-medium'>
                {cardData.description}
            </div>
            </div>
            <div className='flex flex-row mt-5 justify-between'>
                <div>
                {cardData.level}
                </div>
                <div className=''>
                {cardData.lessionNumber}
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default CourseCard