import React from 'react'
import './view.css'
const Promotion = ({ value }) => {
    return (

        <div className='promotion'>
            <div className='promotion_text' >{value}%</div>
            <div className='promotion_text'>Giảm</div>
        </div>
    )
}

export default Promotion
