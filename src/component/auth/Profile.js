import React from 'react'
import { Link } from 'react-router-dom'
import MyAccount from './MyAccount'
import Oders from './Oders'

const Profile = ({ optionRoute }) => {
    let body = (
        <>

            {optionRoute === 'myaccount' && <MyAccount />}
            {optionRoute === 'oders' && <Oders />}
        </>
    )
    return (
        <div className='container' style={{ marginTop: '80px' }}>
            <div className='row '>
                <div className='col-12 col-lg-2 d-flex flex-column  align-items-start'>
                    <Link to='/profile' className='mt-3 text-dark text-decoration-none' style={{
                        fontWeight: 'bold'
                    }}><i className="fa fa-user" style={{
                        fontSize: '22px',
                        margin: '4px',

                    }} />Tài khoản của tôi</Link>
                    <Link to='/oders' className='mt-3 text-dark text-decoration-none' style={{
                        fontWeight: 'bold'
                    }}><i className="fa fa-clipboard" style={{
                        fontSize: '22px',
                        margin: '4px'
                    }} />Đơn mua</Link>
                </div>
                <div className='col-12 col-lg-10 d-flex flex-column  align-items-start'>
                    {
                        body
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile
