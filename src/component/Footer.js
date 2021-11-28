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
                <ul className='d-flex'>
                    <li><img src={dataImg.logo1} alt='' /></li>
                    <li><img src={dataImg.logo2} alt='' /></li>
                    <li><img src={dataImg.logo3} alt='' /></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
