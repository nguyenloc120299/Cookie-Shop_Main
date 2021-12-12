import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

const ModalAuth = ({ setIsShow }) => {

    const [isChange, setIsChange] = useState(false)
    return (
        <div className='modal'>


            <div className='modal_auth'>
                <div className='position-relative w-100 h-100'>
                    <div className='close_auth' onClick={() => setIsShow(false)}>
                        <span>X</span>
                    </div>
                    {
                        isChange ? <Register setIsChange={setIsChange} setIsShow={setIsShow} /> : <Login setIsChange={setIsChange} setIsShow={setIsShow} />
                    }
                </div>


            </div>
        </div>
    )
}

export default ModalAuth
