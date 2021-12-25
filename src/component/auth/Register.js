
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import swal from 'sweetalert'
import { apiInstance } from '../../baseApi'
import Loading from '../view/Loading'

const Register = ({ setIsChange, setIsShow }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [err, setErr] = useState('')
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        address: '',
        phone: ''
    })

    const validPhone = (phone) => {
        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return vnf_regex.test(phone)
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const valid = ({
        username, password, name, email, phone
    }) => {
        const err = {}
        if (username.length > 10) err.username = 'Tên người dùng không quá 10 kí tự'
        if (password.length < 6) err.password = 'Mật khẩu dài hơn 6 kí tự'
        if (name.length > 20) err.name = 'Họ tên nhỏ hơn 20 kí tự'
        if (!validPhone(phone)) err.phone = 'Số điện thoại không hợp lệ'
        if (!validateEmail(email)) err.email = 'Email không hợp lệ'
        return {
            errMsg: err,
            errLength: Object.keys(err).length
        }
    }
    const handleInput = e => {
        const { name, value } = e.target

        setUserLogin({ ...userLogin, [name]: value })
    }
    const submitRegister = async () => {
        try {
            const check = valid(userLogin)
            if (check.errLength > 0) return setErr(check.errMsg);
            else {
                setIsLoading(true)
                await apiInstance.post('/sigup', { ...userLogin });
                setIsShow(false)
                swal('Đăng kí tài khoản thành công', 'Vui lòng xác nhận mail để kích hoạt tài khoản', 'success')
                setIsLoading(false)
            }
        } catch (error) {
            setIsShow(false)
            setIsLoading(false)
            // swal(`${error.reponse.data}`, '', 'warning')
            swal(`${error.response.data.message}`, 'Thử lại sau', 'error');
        }

        //window.location.href = '/login'
    }
    return (
        <div className='login'>
            {
                isLoading && <Loading />
            }
            <div className='logo'>
                <Link to='/'> <h2 style={{

                    padding: "5px",
                    color: ' rgb(26, 148, 255)',
                    fontWeight: '600'

                }}>Cookies Shop</h2></Link>
            </div>

            <div className="mb-3">
                <label>Họ và tên</label>
                <input type="text" className="form-control"
                    name='name'
                    value={userLogin.name}
                    onChange={handleInput}
                    placeholder='Họ và tên'
                />
                {err.name && <small>{err.name}</small>}
            </div>
            <label>Tên người dùng</label>
            <div className="mb-3">

                <input type="text" className="form-control"
                    name='username'
                    value={userLogin.username}
                    onChange={handleInput}
                    placeholder='Tên người dùng'
                />
                {err.username && <small>{err.username}</small>}
            </div>
            <div className="mb-3">
                <label>Mật khẩu</label>
                <input type="password" className="form-control"
                    name='password'
                    value={userLogin.password}
                    onChange={handleInput}
                    placeholder='Mật khẩu'
                />
                {err.password && <small>{err.password}</small>}
            </div>
            <div className="mb-3">
                <label>Địa chỉ</label>
                <input type="text" className="form-control"
                    name='address'
                    value={userLogin.address}
                    onChange={handleInput}
                    placeholder='Địa chỉ'
                />

            </div>
            <div className="mb-3">
                <label>Số điện thoại</label>
                <input type="text" className="form-control"
                    name='phone'
                    value={userLogin.phone}
                    onChange={handleInput}
                    placeholder='Số điện thoại'
                />
                {err.phone && <small>{err.phone}</small>}
            </div>
            <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control"
                    name='email'
                    value={userLogin.email}
                    onChange={handleInput}
                    placeholder='Email'
                />
                {err.email && <small>{err.email}</small>}
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
