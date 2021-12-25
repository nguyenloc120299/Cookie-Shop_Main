
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { dataImg } from '../../assets/img/imgData'
import swal from 'sweetalert'
import { apiInstance } from '../../baseApi'
import Loading from '../view/Loading'
const SellerRegister = ({ setIsChange }) => {
    const [err, setErr] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        address: '',
        phone: ''
    })
    const history = useHistory()
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
            if (check.errLength > 0) setErr(check.errMsg)
            else {
                setIsLoading(true)
                const res = await apiInstance.post('/seller/sigup', { ...userLogin });

                swal(` ${res.data.message} `, {
                    icon: "success",
                });
                setUserLogin({
                    username: '',
                    password: '',
                    name: '',
                    email: '',
                    address: '',
                    phone: ''
                })
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            swal(`${error.response.data.message}`, '', 'error')
        }


    }
    return (
        <div className='login' style={{
            background: 'rgb(246, 246, 246)',
            marginTop: "25rem"
        }}>
            {
                isLoading && <Loading />
            }
            <h1 className='text-center' style={{

                padding: '5px',
                marginBottom: '10px',
                fontWeight: 'bold'
            }}>Bán hàng cùng Cookies Shop</h1>
            <div className='d-flex justify-content-around align-items-center w-100 seller_form'>

                <div className='d-flex justify-content-center flex-column  '>

                    <h5 className='text-center'>Quản lý shop của bạn một cách hiệu quả hơn trên <br />
                        Cookies - Kênh Người bán
                    </h5>
                    <img src={dataImg.imgSeller} alt='' />
                </div>
                <div style={{ width: "30%" }} className='seller_input'>
                    <div className="mb-3">
                        <label>Tên chủ Shop</label>
                        <input type="text" className="form-control"
                            name='name'
                            value={userLogin.name}
                            onChange={handleInput}
                            placeholder='Tên chủ Shop'
                        />
                        {
                            err.name && <small>{err.name}</small>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Tên tài khoản</label>
                        <input type="text" className="form-control"
                            name='username'
                            value={userLogin.username}
                            onChange={handleInput}
                            placeholder='Tên tài khoản'
                        />
                        {
                            err.username && <small>{err.username}</small>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control"
                            name='password'
                            value={userLogin.password}
                            onChange={handleInput}
                            placeholder='Mật khẩu'
                        />
                        {
                            err.password && <small>{err.password}</small>
                        }
                    </div>
                    <div className="mb-3">
                        <label>Địa chỉ shop</label>
                        <input type="text" className="form-control"
                            name='address'
                            value={userLogin.address}
                            onChange={handleInput}
                            placeholder='Địa chỉ'
                        />

                    </div>
                    <label>Số điện thoại</label>
                    <div className="mb-3">

                        <input type="text" className="form-control"
                            name='phone'
                            value={userLogin.phone}
                            onChange={handleInput}
                            placeholder='Số điện thoại'
                        />
                        {
                            err.phone && <small>{err.phone}</small>
                        }
                    </div>
                    <label>Email</label>
                    <div className="mb-3">

                        <input type="email" className="form-control"
                            name='email'
                            value={userLogin.email}
                            onChange={handleInput}
                            placeholder='Email'
                        />
                        {
                            err.email && <small>{err.email}</small>
                        }
                    </div>
                    <button className="btn w-100 text-white" onClick={() => submitRegister()}
                        style={{
                            background: 'rgb(255, 15, 30)',
                            height: '3rem',
                            marginTop: '1rem'
                        }}
                    >Đăng kí</button>

                    <div className="mt-3 text-center">Bạn đã có tài khoản ? <span><a href='https://cookiesshop-manager.netlify.app' target='_blank' >Đăng nhập</a></span> </div>
                </div>
            </div>
        </div>

    )
}

export default SellerRegister
