import React from 'react'
import { IoLocationOutline } from 'react-icons/all'
import { Link } from 'react-router-dom'

const Address = ({ user, isChangeAddress, setIsChangeAddress, setAddress, newAddress, handleOnchangeAddress }) => {

    return (
        <div className='address'>
            <div className='d-flex justify-content-between'>
                <h5 style={{ textAlign: 'left' }}><IoLocationOutline />Địa chỉ nhận hàng</h5>
                {

                    isChangeAddress && <small style={{

                        cursor: 'pointer',
                        fontSize: '17px',
                        fontWeight: 'bold',

                    }} onClick={() => setIsChangeAddress(false)}>Hủy</small>
                }
            </div>
            {
                isChangeAddress ?
                    <div className='position-relative'>
                        <input class="form-control mb-3"
                            placeholder='Họ và tên'
                            value={newAddress.newName}
                            name='newName'
                            onChange={handleOnchangeAddress}
                        />
                        <input class="form-control mb-3"
                            placeholder='Địa chỉ'
                            name='newAddress'
                            value={newAddress.newAddress}
                            onChange={handleOnchangeAddress}

                        />
                        <input class="form-control mb-3 "
                            placeholder='Số điện thoại'
                            name='newPhone'
                            onChange={handleOnchangeAddress}
                            value={newAddress.newPhone}

                        />


                    </div>

                    :

                    <div className='d-flex justify-content-between'>
                        {user &&
                            <h6 style={{ maxWidth: '80%' }}>{user.name + ' ' + user.phone + ' ' + user.address}</h6>
                        }
                        <Link to='#' style={{
                            marginLeft: '2rem'
                        }} onClick={() => setIsChangeAddress(true)}><h6 >Thay đổi</h6></Link>
                    </div>
            }
        </div>
    )
}

export default Address