import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import PaypalExpressBtn from "react-paypal-express-checkout";
import { GlobalContext } from '../../GlobalContext';
import swal from 'sweetalert';
const PaymentFooter = ({ isType, cart, user, setIsPayment, noteValue, isChangeAddress, newAddress }) => {
    const [productDetailArr, setProductDetailArr] = useState([])
    const context = useContext(GlobalContext)
    const [callBack, setCallback] = context.callBackcart
    const [total, setTotal] = useState(0)
    const client = {
        sandbox:
            "AXMUBOcaszqCzfEOC-r--Rn7rMVoEbH9c6XbmyKb04nURqcLhpFxWwwnaUytaMR9UTaE2vwLfi5tqKbT",
        production: "loc120299"
    };
    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data

    }
    let style = {
        size: 'small',
        color: 'black',

        shape: 'rect',
        label: 'checkout',
        tagline: false
    }

    useEffect(() => {
        let cartPaymment = []
        let t = 0
        cart && cart.forEach(element => {

            t += element.totalCost
            if (element) cartPaymment.push({
                totalmoney: element.totalCost,
                quantity: element.quantity,
                discount: element.competitive_price,
                productId: element.id
            })

        });
        setTotal(t)
        setProductDetailArr(cartPaymment)
    }, [cart])

    const handleSubmit = async e => {
        try {
            const res = await axios.post('/orders', {
                payments: !isType ? '1' : '0',
                deliveryaddress: isChangeAddress ? newAddress : (user && user.address),
                transportfee: 30000.0,
                namecustomer: user && user.name,
                email: user && user.email,
                phone: user && user.phone,
                note: noteValue,
                userId: user && user.id,
                listOrderdetail: productDetailArr
            })
            setIsPayment(false)

            localStorage.removeItem('cart')
            setCallback(!callBack)
            swal("Bạn đã thanh toán thành công", "Tiếp tục mua hàng", "success")
                .then(() => {
                    window.location.href = '/home'
                });
        } catch (error) {
            alert("Có lỗi xẩy ra vui lòng thử lại sau")
        }

    }
    return (
        <div className='payment_footer'>
            {
                !isType ?
                    <div>
                        <button className='btn btn-dark w-100 btn-payment' type='submit' style={{ height: '55px' }} onClick={() => handleSubmit()}>Đặt hàng</button>
                    </div>
                    :
                    <PaypalExpressBtn client={client} currency={"USD"} total={Math.round(total / 23000)} style={style} onSuccess={handleSubmit} />

            }
        </div>
    )
}

export default PaymentFooter
