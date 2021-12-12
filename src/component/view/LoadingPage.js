import React from 'react'
import { Link } from 'react-router-dom'
import './view.css'
const LoadingPage = () => {
    return (

        <div className="load-page">
            <img src='https://frontend.tikicdn.com/_desktop-next/static/img/icon-seller.svg' alt='' style={{
                height: '15rem'
            }} />
            <div className='logo'>
                <Link to='/'> <h3 style={{

                    padding: "5px"
                }}>Cookies web</h3></Link>
            </div>

            <div className="lds-ellipsis1"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoadingPage
