import React from 'react'
import { IoLocationOutline } from 'react-icons/all'
import { Link } from 'react-router-dom'

const Address = ({ user, isChangeAddress, setIsChangeAddress, setAddress, newAddress }) => {

    return (
        <div className='address'>
            <div>
                <h5 style={{ textAlign: 'left' }}><IoLocationOutline />Địa chỉ nhận hàng</h5>

            </div>
            {
                isChangeAddress ?
                    <div className='position-relative'>
                        <textarea class="form-control"
                            value={newAddress}
                            onChange={e => setAddress(e.target.value)}
                        />
                        <small className='position-absolute' style={{
                            right: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            fontSize: '1.5rem'
                        }} onClick={() => setIsChangeAddress(false)}>x</small>

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