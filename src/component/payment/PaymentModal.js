import React, { useContext, useState } from 'react'
import Address from './Address'
import PaymentType from './PaymentType'
import ProductPayMent from './ProductPayMent'
// import BtnPaymentCheckOut from './BtnPayPalCheckOut'

import PaymentFooter from './PaymentFooter';
import { GlobalContext } from '../../GlobalContext';

const PaymentModal = ({ setIsPayment, cart }) => {
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const [isLoggin, setIsLoggin] = context.isLoggin
    const [isChangeAdress, setIsChangeAddress] = useState(false)
    const [newAddress, setNewAddress] = useState('')
    const [user] = users.filter(item => {
        if (isLoggin) {
            const { id } = JSON.parse(localStorage.getItem('login_admin_main'))

            return item.id === id
        }
    })
    const [isType, setIsType] = useState(false)
    const [noteValue, setNoteValue] = useState('')

    return (
        <div className='paymentModal'>
            <div className='form_modal'>
                <div className='payment_header'>
                    <h3>Thanh toán</h3>
                    <span onClick={() => setIsPayment(false)}>&times;</span>
                </div>
                <div className='payment_body'>

                    <ProductPayMent cart={cart} />
                    <hr />
                    <Address user={user} isChangeAddress={isChangeAdress} setIsChangeAddress={setIsChangeAddress}
                        setAddress={setNewAddress}
                        newAddress={newAddress}
                    />
                    <hr />

                    <textarea className='form-control' placeholder='Thêm ghi chú'
                        rows={3}
                        value={noteValue}
                        onChange={(e) => setNoteValue(e.target.value)}></textarea>
                    <br />
                    <PaymentType setIsType={setIsType} isChangeAddress={isChangeAdress} />
                    <br />
                </div>
                <PaymentFooter isType={isType} cart={cart} user={user} setIsPayment={setIsPayment}
                    noteValue={noteValue}
                    newAddress={newAddress}
                    isChangeAddress={isChangeAdress}
                />
            </div>
        </div>
    )
}

export default PaymentModal
