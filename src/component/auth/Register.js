import axios from 'axios'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

const Register = () => {
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
        await axios.post('/sigup', { ...userLogin });
        alert('Đăng kí thành công');
        window.location.href = '/login'
    }
    return (
        <div className='login mt-5 col col-10 col-lg-4'>
            <h2 className='text-center' style={{
                border: '1px solid white',
                padding: '5px',
                marginBottom: '10px'
            }}>Cookies Shop</h2>

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
            <button className="btn btn-outline-light" onClick={() => submitRegister()}>Đăng kí</button>

            <div className="text-white mt-3">Bạn đã có tài khoản ? <span><Link to='/login'>Đăng nhập</Link></span> </div>
        </div>
    )
}

export default Register
