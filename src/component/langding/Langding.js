import React from 'react'
import Abount from './abount/Abount'
import './landing.css'
import Slider from './Slider/Slider'
const Langding = () => {


    return (
        <div className='landing'>
            <Slider />



            <div className='row w-100 abount mt-5'>
                <Abount />
            </div>

        </div>
    )
}

export default Langding
