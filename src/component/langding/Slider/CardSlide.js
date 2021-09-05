import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
const CardSlide = ({ item }) => {
    const [isShow, setIsShow] = useState(false)
    return (
        <div className='card' onMouseLeave={() => setIsShow(false)} onMouseMove={() => setIsShow(true)} >
            <img src={item.avartar} alt="" />
            <div className='des__slide' style={isShow ? { top: '50%' } : { top: '-100%' }} onMouseMove={() => setIsShow(true)} onMouseLeave={() => setIsShow(false)}>

                <Link to='#' className='title__des'><h4>{item.name}</h4></Link>

                <p>{item.price}</p>
                <button type="button" className="btn btn-outline-dark"><FaShoppingCart /></button>
            </div>
        </div>

    )
}

export default CardSlide
