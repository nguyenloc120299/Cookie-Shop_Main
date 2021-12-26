import React from 'react'
import { FaCcPaypal, MdLocalShipping } from 'react-icons/all'

const PaymentType = ({ setIsType }) => {

    return (
        <div className='payment_type d-flex justify-content-around'>
            <div className="form-check" onClick={() => setIsType(false)}>

                <label className="form-check-label" for="flexRadioDefault1" style={{
                    fontWeight: 'bold'
                }}>
                    <MdLocalShipping className='text-primary' style={{ fontSize: '30px', }} />  Thanh toán khi nhận hàng
                </label>
            </div>
            <div className="form-check" onClick={() => setIsType(true)}>

                <label className="form-check-label" for="flexRadioDefault2" style={{
                    fontWeight: 'bold'
                }}>
                    <FaCcPaypal className='text-primary' style={{ fontSize: '30px', }} />   Thanh toán qua Paypal
                </label>
            </div>
        </div>
    )
}

export default PaymentType
