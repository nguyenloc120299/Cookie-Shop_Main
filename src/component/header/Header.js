import React, { useContext, useEffect, useState } from 'react'
import { FaList, FaUserAlt, BsSearch } from 'react-icons/all'
import { NavLink, Link, useHistory } from 'react-router-dom'
import { BiShoppingBag } from 'react-icons/bi'
import { GlobalContext } from '../../GlobalContext'
import './header.css'
const Header = ({ setIsShow }) => {
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    // const [user, setUser] = useState([])
    const history = useHistory()

    const [isLoggin, setIsLoggin] = context.isLoggin

    const [cart, setCart] = context.cart
    const [nameUser, setNameUser] = useState(null)
    // useEffect(() => {
    //     if (isLoggin) {
    //         const res = JSON.parse(localStorage.getItem('login_admin_main'))
    //         if (res) setUser(res)
    //     }
    // }, [isLoggin])
    const [user] = users.filter(item => {
        if (isLoggin) {
            const { id } = JSON.parse(localStorage.getItem('login_admin_main'))

            return item.id === id
        }
    })

    const Logout = () => {
        localStorage.setItem('login_admin_main', false)

        setIsLoggin(false)

        history.push('/')
        //window.location.href = '/home'
    }

    return (
        <div className='header'>
            <div className='d-flex justify-content-around align-items-center w-100 p-2'>
                <div className='menu' >
                    <FaList />
                </div>
                <div className='logo'>
                    <Link to='/'> <h3 style={{

                        padding: "5px"
                    }}>Cookies</h3></Link>
                </div>

                {/* <ul className='links' >
                <li>
                    <NavLink to='/' >Trang chủ</NavLink>
                </li>
                <li>
                    <NavLink to='/home'>Cửa hàng</NavLink>
                </li>

                <li style={{ position: 'absolute', right: '20%', display: 'flex', top: '38%' }} className='li-info'
                >
                </li>
                <li> */}
                <div className="input-group w-50 search_desktop ">
                    <input type="text" className="form-control" placeholder="Tìm kiếm" style={{
                        borderRadius: 'none'
                    }} />
                    <button className="btn btn-outline-primary" type="button" style={{
                        color: 'white',

                        background: 'rgb(13, 92, 182)'
                    }}><BsSearch style={{
                        marginRight: '3px',

                    }} /> Tìm kiếm</button>
                </div>
                <div className='search_mobile'>
                    <BsSearch style={{
                        marginRight: '3px',

                    }} />
                </div>
                {/* </li>
            </ul> */}

                <div className='shop-cart'>
                    <div className='user-profile' >
                        {
                            isLoggin ?
                                <>
                                    <Link to='#' style={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textDecoration: 'none'
                                    }} className='dropdown'>
                                        <img src={user && user.avartar} alt='' style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }} className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false" />
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown p-5">
                                            <li><Link to='/profile' className="dropdown-item dropdown_item" href="#">Trang cá nhân</Link></li>
                                            <li><Link to='#' className="dropdown-item  dropdown_item" href="#" onClick={() => Logout()}>Đăng xuất</Link></li>
                                        </ul>
                                    </Link>
                                </>
                                :
                                <Link to={'#'} onClick={() => setIsShow(true)}>    <FaUserAlt style={{
                                    fontSize: '20px',
                                    color: 'white'
                                }} /></Link>
                        }
                    </div>

                    <div className='icon-cart' style={{ marginLeft: '30px' }} />
                    <Link to='/cart' id='cart-shop'>  <BiShoppingBag style={{
                        fontSize: '27px',
                        color: 'white'
                    }} /></Link>
                    <span>{cart.length}</span>
                </div>
            </div>
            <div className='w-100 d-flex justify-content-end align-items-center' style={{
                padding: '0 4rem'
            }}>
                <Link to='register-seller' style={{
                    color: 'white',
                    fontSize: '12px',
                    textDecoration: 'none',
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    padding: '5px 10px',
                    borderRadius: '10px'
                }}>
                    <img className="icon m-1" src="https://frontend.tikicdn.com/_desktop-next/static/img/icon-seller.svg" alt='' />
                    Bán hàng cùng Cookies
                </Link>
            </div>
        </div >
    )
}

export default Header
