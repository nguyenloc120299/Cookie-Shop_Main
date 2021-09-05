import React, { useContext } from 'react'
import { FaList, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BiShoppingBag } from 'react-icons/bi'
import { GlobalContext } from '../../GlobalContext'
import './header.css'
const Header = () => {
    const context = useContext(GlobalContext)
    const [cart] = context.cart

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
            </ul>

            <div className='shop-cart'>
                <div className='user-profile' >
                    <FaUserAlt style={{
                        fontSize: '20px',
                        color: 'white'
                    }} />
                </div>
                <div className='icon-cart' style={{ marginLeft: '30px' }} />
                <BiShoppingBag style={{
                    fontSize: '27px',
                    color: 'white'
                }} />
                <span>{cart.length}</span>
            </div>


        </div >
    )
}

export default Header
