import React from 'react'
import { FaCcPaypal, BiDollar } from 'react-icons/all'

const PaymentType = ({ setIsType }) => {

    return (
        <div className='payment_type d-flex justify-content-around'>
            <div className="form-check" onClick={() => setIsType(false)}>

                <label className="form-check-label" for="flexRadioDefault1">
                    Thanh toán khi nhận hàng <BiDollar className='text-primary' style={{ fontSize: '30px', }} />
                </label>
            </div>
            <div className="form-check" onClick={() => setIsType(true)}>

                <label className="form-check-label" for="flexRadioDefault2">
                    Thanh toán qua Paypal <FaCcPaypal className='text-primary' style={{ fontSize: '30px', }} />
                </label>
            </div>
        </div>
    )
}

export default PaymentType
