import React from 'react'

const HighlightText = ({text}) => {
  return (
    // Apply gradient
    <span className='font-bold text-blue-200'>
        {" "}
        {text}
    </span>
  )
}
export default HighlightText
