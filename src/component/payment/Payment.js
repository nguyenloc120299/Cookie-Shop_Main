import React from 'react'
import Address from './Address'
import PaymentType from './PaymentType'
import ProductPayMent from './ProductPayMent'
import './payment.css'
const Payment = () => {
    return (
        <div className='payment' style={{
            marginTop: '70px'
        }}>
            <Address />
            <ProductPayMent />
            <PaymentType />
        </div>
    )
}

export default Payment
