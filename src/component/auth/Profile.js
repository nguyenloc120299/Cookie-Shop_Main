import React from 'react'
import { Link } from 'react-router-dom'
import AddProducts from './AddProducts'
import MyAccount from './MyAccount'
import MyShop from './MyShop'
import Oders from './Oders'
import History from './History'
const Profile = ({ optionRoute }) => {
    let body = (
        <>

            {optionRoute === 'myaccount' && <MyAccount />}
            {optionRoute === 'oders' && <Oders />}
            {optionRoute === 'myshop' && <MyShop />}
            {optionRoute === 'history' && <History />}


        </>
    )
    return (
        <div style style={{ marginTop: '8rem', width: '100%', height: '100vh', overflow: 'scroll' }}>
            <div className='row ' style={{
                height: '100%',
                padding: '0 7rem'
            }}>
                <div className='col-12 col-lg-2 d-flex flex-column  align-items-start'>
                    <Link to='/profile' className='mt-3 text-dark text-decoration-none' style={{
                        fontWeight: 'bold'
                    }}>
                        <img src='./user.png' style={{
                            width: "1.3rem",
                            marginRight: '5px'
                        }} />Tài khoản của tôi</Link>
                    <Link to='/oders' className='mt-3 text-dark text-decoration-none' style={{
                        fontWeight: 'bold'
                    }}><img src='./order.png' style={{
                        width: "1.3rem",
                        marginRight: '5px'
                    }} />Đơn mua</Link>
                    <Link to='/history' className='mt-3 text-dark text-decoration-none' style={{
                        fontWeight: 'bold'
                    }}><img src='./medical-checkup.png' style={{
                        width: "1.3rem",
                        marginRight: '5px'
                    }} />Lịch sử giao hàng</Link>
                    {/* <div className='mt-3 dropdown'>
                        <Link to='#' className='text-dark text-decoration-none dropdown-toggle' id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{
                            fontWeight: 'bold'
                        }}><i className="fas fa-shopping-basket" style={{
                            fontSize: '22px',
                            margin: '4px'
                        }} />Kênh bán hàng</Link>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><Link to='#' className="dropdown-item" href="#">Quản lý đơn hàng</Link></li>
                            <li><Link to='my-shop' className="dropdown-item" href="#">Quản lý sản phẩm</Link></li>

                        </ul>
                    </div> */}
                </div>
                <div className='col-12 col-lg-10 d-flex flex-column  align-items-start mt-3'>
                    {
                        body
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile
