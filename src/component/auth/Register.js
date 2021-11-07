import axios from 'axios'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

const Register = ({ setIsChange }) => {
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        address: '',
        phone: ''
    })
    const handleInput = e => {
        const { name, value } = e.target

        setUserLogin({ ...userLogin, [name]: value })
    }
    const submitRegister = async () => {
        const res = await axios.post('/sigup', { ...userLogin });

        alert(res.data);
        //window.location.href = '/login'
    }
    return (
        <div className='login'>
            <div className='logo'>
                <Link to='/'> <h2 style={{

                    padding: "5px",
                    color: ' rgb(26, 148, 255)'

                }}>Cookies Shop</h2></Link>
            </div>

            <div className="mb-3">

                <input type="text" className="form-control"
                    name='name'
                    value={userLogin.name}
                    onChange={handleInput}
                    placeholder='Họ và tên'
                />

            </div>
            <div className="mb-3">

                <input type="text" className="form-control"
                    name='username'
                    value={userLogin.username}
                    onChange={handleInput}
                    placeholder='Tên người dùng'
                />

            </div>
            <div className="mb-3">

                <input type="password" className="form-control"
                    name='password'
                    value={userLogin.password}
                    onChange={handleInput}
                    placeholder='Mật khẩu'
                />
            </div>
            <div className="mb-3">

                <input type="text" className="form-control"
                    name='address'
                    value={userLogin.address}
                    onChange={handleInput}
                    placeholder='Địa chỉ'
                />

            </div>
            <div className="mb-3">

                <input type="text" className="form-control"
                    name='phone'
                    value={userLogin.phone}
                    onChange={handleInput}
                    placeholder='Số điện thoại'
                />

            </div>
            <div className="mb-3">

                <input type="email" className="form-control"
                    name='email'
                    value={userLogin.email}
                    onChange={handleInput}
                    placeholder='Email'
                />

            </div>
            <button className="btn w-100 text-white" onClick={() => submitRegister()}
                style={{
                    background: 'rgb(255, 15, 30)',
                    height: '4rem'
                }}
            >Đăng kí</button>

            <div className="mt-3 text-center">Bạn đã có tài khoản ? <span><Link to='#' onClick={() => setIsChange(false)}>Đăng nhập</Link></span> </div>
        </div>
    )
}

export default Register
