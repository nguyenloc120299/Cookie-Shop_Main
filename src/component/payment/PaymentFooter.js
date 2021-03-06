
import React, { useContext, useEffect, useState } from 'react'
import PaypalExpressBtn from "react-paypal-express-checkout";
import { GlobalContext } from '../../GlobalContext';
import swal from 'sweetalert';
import { apiInstance } from '../../baseApi';
import Loading from '../view/Loading';
const PaymentFooter = ({ isType, cart, user, setIsPayment, noteValue, isChangeAddress, newAddress }) => {
    const [productDetailArr, setProductDetailArr] = useState([])
    const context = useContext(GlobalContext)
    const [callBack, setCallback] = context.callBackcart
    const [total, setTotal] = useState(0)
    const [totalUSD, setToTalUSD] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const { name } = JSON.parse(localStorage.getItem('login_admin_main'))

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
        color: 'blue',

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
                productId: element.id,
                name: element.name,
                avartar: element.avartar
            })

        });
        let usd = Math.round(t / 22000)
        setToTalUSD(usd)
        setTotal(t)
        setProductDetailArr(cartPaymment)
    }, [cart])

    const handleSubmit = async e => {
        try {
            setIsLoading(true)
            const res = await apiInstance.post('/orders', {
                payments: !isType ? '1' : '0',
                deliveryaddress: isChangeAddress ? newAddress.newAddress : (user && user.address),
                transportfee: 30000.0,
                namecustomer: isChangeAddress ? newAddress.newName : (user && user.name),
                email: user && user.email,
                phone: isChangeAddress ? newAddress.newPhone : (user && user.phone),
                note: noteValue,
                userId: user && user.id,
                listOrderdetail: productDetailArr
            })
            setIsPayment(false)
            localStorage.removeItem('cart')
            setCallback(!callBack)
            swal(`C??m ??n ${name} ???? ?????t h??ng`, "Ti???p t???c mua s???m", "success")
                .then(() => {
                    window.location.href = '/home'
                });
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            swal(`error.response.data.message`, '', 'error')
        }

    }
    return (
        <>
            {
                isLoading && <Loading />
            }
            <div className='payment_footer'>

                {
                    !isType ?
                        <div>
                            <button className='btn btn-primary w-100 btn-payment' type='submit' style={{ height: '55px', fontWeight: 'bold' }} onClick={() => handleSubmit()}>Thanh to??n</button>
                        </div>
                        :
                        <PaypalExpressBtn client={client} currency={"USD"} total={total} style={style} onSuccess={handleSubmit} />

                }
            </div>
        </>
    )
}

export default PaymentFooter
