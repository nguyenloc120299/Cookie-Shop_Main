import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import './login.css'
const Login = ({ setIsChange }) => {
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const [callback, setCallback] = context.usersApi.callBack
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: ''
    })
    const history = useHistory()
    const handleInput = e => {
        const { name, value } = e.target

        setUserLogin({ ...userLogin, [name]: value })
    }
    const onSubmitLogin = async () => {
        const res = await axios.post('/signin', { ...userLogin })
        //  localStorage.setItem('login_admin', true)


        if (res.data.token) {
            const res1 = await axios.get(`/users/${res.data.id}`)


            if (res1 && res1.data.status === 1) {
                localStorage.setItem('login_admin_main', JSON.stringify(res1.data))
                window.location.href = '/'
            } else {
                alert('Chưa xác thực email')
            }
        } else {
            alert('Đăng nhập không thành công')

        }

    }
    return (
        <div className='login'>
            <h2 className='text-center' style={{

                padding: '5px',
                marginBottom: '2rem'
            }}>Cookies Shop</h2>

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

            <button className="btn text-white w-100" onClick={() => onSubmitLogin()}
                style={{
                    background: 'rgb(255, 15, 30)',
                    height: '4rem'
                }}
            >Đăng nhập</button>

            <div class=" mt-3 text-center">Bạn chưa có tài khoản ? <span><Link to='#' onClick={() => setIsChange(true)}>Đăng kí</Link></span> </div>
        </div>
    )
}

export default Login
