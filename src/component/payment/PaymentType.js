import React from 'react'
import { FaCcPaypal } from 'react-icons/all'
const PaymentType = ({ setIsType }) => {

    return (
        <div className='payment_type d-flex justify-content-around'>
            <div className="form-check" onClick={() => setIsType(false)}>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                <label className="form-check-label" for="flexRadioDefault1">
                    Thanh toán khi nhận hàng
                </label>
            </div>
            <div className="form-check" onClick={() => setIsType(true)}>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" for="flexRadioDefault2">
                    Thanh toán qua Paypal <FaCcPaypal style={{ fontSize: '30px' }} />
                </label>
            </div>
        </div>
    )
}

export default PaymentType
