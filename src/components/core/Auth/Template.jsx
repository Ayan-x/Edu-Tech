import React from 'react'

const Template = ({title,desc1,desc2,img,googleText}) => {
  return (
    <div>
        <div className='flex flex-row'>
            <div>
            <div className='text-richblack-5'>
                {title}
            </div>
            <div className='text-richblack-5'>
                {desc1}
            </div>
            </div>
            <div>
                <img src={img} alt="." />
            </div>
            
        </div>
    </div>
  )
}

export default Template