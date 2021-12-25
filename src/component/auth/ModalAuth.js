import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'

const ModalAuth = ({ setIsShow }) => {

    const [isChange, setIsChange] = useState(false)
    return (
        <div className='modal'>


            <div className='modal_auth d-flex'>
                <div className='close_auth' onClick={() => setIsShow(false)}>
                    <span>X</span>
                </div>
                <div className='position-relative w-100 h-100'>

                    {
                        isChange ? <Register setIsChange={setIsChange} setIsShow={setIsShow} /> : <Login setIsChange={setIsChange} setIsShow={setIsShow} />
                    }
                </div>
                <div style={{
                    maxWidth: '32rem',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                    <div>
                        <img src='https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png' alt='' className='w-100' />
                        <p className='text-center text-primary' style={{
                            fontWeight: 'bold'
                        }}>Mua sắm tại Cookies Shop</p>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default ModalAuth
