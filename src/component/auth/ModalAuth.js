import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

const ModalAuth = ({ setIsShow }) => {

    const [isChange, setIsChange] = useState(false)
    return (
        <div className='modal'>


            <div className='modal_auth'>
                <div className='position-relative'>
                    <div className='close_auth' onClick={() => setIsShow(false)}>x</div>
                </div>
                {
                    isChange ? <Register setIsChange={setIsChange} /> : <Login setIsChange={setIsChange} />
                }

            </div>
        </div>
    )
}

export default ModalAuth
