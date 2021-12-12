
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import { apiInstance } from '../../baseApi'
import { GlobalContext } from '../../GlobalContext'
import './login.css'
const Login = ({ setIsChange, setIsShow }) => {
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const [callback, setCallback] = context.usersApi.callBack
    const [isLoggin, setIsLoggin] = context.isLoggin
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
        try {

            const res = await apiInstance.post('/signin', { ...userLogin })
            //  localStorage.setItem('login_admin', true)


            if (res.data.token) {
                const res1 = await apiInstance.get(`/users/${res.data.id}`)


                if (res1 && res1.data.status === 1) {
                    localStorage.setItem('login_admin_main', JSON.stringify(res1.data))
                    setIsLoggin(!isLoggin)
                    setCallback(!callback)
                    setIsShow(false)
                } else {
                    setIsShow(false)
                    swal('Chưa xác thực email', '', 'error')
                }
            } else {
                setIsShow(false)
                swal('Đăng nhập không thành công', '', 'error')

            }

        } catch (error) {
            swal(`${error.response.data.message}`, '', 'error')
        }

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
