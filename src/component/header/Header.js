import React, { useContext, useEffect, useState } from 'react'
import { FaList, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BiShoppingBag } from 'react-icons/bi'
import { GlobalContext } from '../../GlobalContext'
import './header.css'
const Header = () => {
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const [cart] = context.cart
    const [isLoggin, setIsLoggin] = context.isLoggin
    const [nameUser, setNameUser] = useState(null)
    // useEffect(() => {
    //     if (isLoggin) {
    //         const { id } = JSON.parse(localStorage.getItem('login_admin_main'))
    //         users && users.forEach(user => {
    //             if (user.id === id) setNameUser(user.avartar)
    //         });
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
    }

    return (
        <div className='header'>
            <div className='menu' >
                <FaList />
            </div>
            <div className='logo'>
                <Link to='/'> <h3 style={{
                    border: "1px solid",
                    padding: "5px"
                }}>Cookies</h3></Link>
            </div>

            <ul className='links' >
                <li>
                    <Link to='/' >Trang chủ</Link>
                </li>
                <li>
                    <Link to='/home'>Cửa hàng</Link>
                </li>

                <li style={{ position: 'absolute', right: '20%', display: 'flex', top: '38%' }} className='li-info'
                >
                </li>
                <li>
                    <div className="input-group mb-3 ">
                        <input type="text" className="form-control" placeholder="Tìm kiếm" />
                        <button className="btn btn-outline-primary" type="button" style={{
                            color: 'white',
                            borderColor: 'white'
                        }}>Button</button>
                    </div>
                </li>
            </ul>

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
                            <Link to={'/login'}>    <FaUserAlt style={{
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


        </div >
    )
}

export default Header
