import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import './login.css'
const Login = () => {
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
            const [user] = users.filter(item => {
                return item.id === res.data.id
            })
            console.log(user);
            if (user.status === 1) {
                localStorage.setItem('login_admin_main', JSON.stringify(res.data))
                window.location.href = '/home'
            } else {
                alert('Chưa xác thực email')
            }
        } else {
            alert('Đăng nhập không thành công')

        }

    }
    return (
        <div className='login mt-5 col col-10 col-lg-4'>
            <h2 className='text-center' style={{
                border: '1px solid white',
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

            <button className="btn btn-outline-light" onClick={() => onSubmitLogin()}>Đăng nhập</button>

            <div class="text-white mt-3">Bạn chưa có tài khoản ? <span><Link to='/register'>Đăng kí</Link></span> </div>
        </div>
    )
}

export default Login
