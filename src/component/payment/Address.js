import React from 'react'
import { IoLocationOutline } from 'react-icons/all'
import { Link } from 'react-router-dom'

const Address = ({ user }) => {

    return (
        <div className='address'>
            <div>
                <h5 style={{ textAlign: 'left' }}><IoLocationOutline />Địa chỉ nhận hàng</h5>

            </div>
            <div className='d-flex justify-content-between'>
                {user &&
                    <h6>{user.name + ' ' + user.phone + ' ' + user.address}</h6>
                }
                <Link to='#' style={{
                    marginLeft: '2rem'
                }}><h6>Thay đổi</h6></Link>
            </div>

        </div>
    )
}

export default Address