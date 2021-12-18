import React from 'react'
import { dataImg } from '../assets/img/imgData'
const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <div className='logo'>
                    <a href="/"> <h3 style={{
                        padding: '5px'
                    }}>Cookies</h3></a>
                </div>
                <div className="copyright text-white text-center mb-5">Copyright @CookiesShop 2021
                </div>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h5 className='text-white'>Liên hệ</h5>
                <ul className='d-flex list_icon' >
                    <li><img src='icon1.png' alt='' /></li>
                    <li><img src='icon2.png' alt='' /></li>
                    <li><img src='icon3.png' alt='' /></li>
                    <li><img src='icon4.png' alt='' /></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
