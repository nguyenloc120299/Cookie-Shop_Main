import React from 'react'
import { FaShippingFast, FaPhone } from 'react-icons/fa'
import { GiReturnArrow } from 'react-icons/gi'
const Abount = () => {
    return (

        <>
            <div className='col-lg-4 mt-2'>
                <FaShippingFast className='icon' />
                <h6>Vận chuyển miễn phí</h6>

            </div>
            <div className='col-lg-4 mt-2'>
                <FaPhone className='icon' />
                <h6>Hổ trợ 24/7</h6>
            </div>
            <div className='col-lg-4 mt-2'>
                <GiReturnArrow className='icon' />
                <h6>Có thể hoàn trả trong 30 ngày</h6>

            </div>

        </>
    )
}

export default Abount
