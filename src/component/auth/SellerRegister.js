
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { dataImg } from '../../assets/img/imgData'
import swal from 'sweetalert'
import { apiInstance } from '../../baseApi'
const SellerRegister = ({ setIsChange }) => {
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        address: '',
        phone: ''
    })
    const history = useHistory()
    const handleInput = e => {
        const { name, value } = e.target

        setUserLogin({ ...userLogin, [name]: value })
    }
    const submitRegister = async () => {

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
        history.push('create-store')
    }
    return (
        <div className='login' style={{
            background: 'rgb(246, 246, 246)',
            marginTop: "25rem"
        }}>
            <h1 className='text-center' style={{

                padding: '5px',
                marginBottom: '10px'
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

                    </div>
                    <div className="mb-3">
                        <label>Tên tài khoản</label>
                        <input type="text" className="form-control"
                            name='username'
                            value={userLogin.username}
                            onChange={handleInput}
                            placeholder='Tên tài khoản'
                        />

                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control"
                            name='password'
                            value={userLogin.password}
                            onChange={handleInput}
                            placeholder='Mật khẩu'
                        />
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

                    </div>
                    <label>Email</label>
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
                            height: '3rem',
                            marginTop: '1rem'
                        }}
                    >Đăng kí</button>

                    <div className="mt-3 text-center">Bạn đã có tài khoản ? <span><a href='https://cookiesshop-manager.netlify.app' >Đăng nhập</a></span> </div>
                </div>
            </div>
        </div>

    )
}

export default SellerRegister
