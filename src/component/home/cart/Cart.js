import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../../GlobalContext'
import { MdDelete } from 'react-icons/md'
import AmountCart from './AmountCart'
import PaymentModal from '../../payment/PaymentModal'
import swal from 'sweetalert'
const Cart = () => {
    const context = useContext(GlobalContext)
    const [cart, setCart] = context.cart
    const [total, setTotal] = useState(0)
    const [isPayment, setIsPayment] = useState(false)
    const [isLoggin, setIsLoggin] = context.isLoggin
    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + item.totalCost
            }, 0)
            setTotal(total)
        }
        getTotal()
    })



    const removeProduct = id => {
        swal({
            title: " Bạn có chắc không? ",

            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    cart.forEach((item, index) => {
                        if (item.id === id) {
                            cart.splice(index, 1)
                        }
                    })
                    setCart([...cart])
                    swal(" Bạn đã xóa sản phẩm khỏi giỏi hàng ", {
                        icon: "success",
                    });
                }
            });
        // if (window.confirm("Bạn muốn xóa")) {
        //     cart.forEach((item, index) => {
        //         if (item.id === id) {
        //             cart.splice(index, 1)
        //         }
        //     })
        //     setCart([...cart])
        // }
    }
    const numberFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const showModalPayment = () => {
        if (isLoggin) setIsPayment(true)
        else swal("Vui lòng đăng nhập để thanh toán", {
            icon: "warning",
        });
    }
    let body = (



        <div class="cart">

            <div className='w-100'>
                <table class="table  table__cart">
                    <thead>
                        <tr>

                            <th >Tên sản phẩm</th>
                            <th >Giá</th>
                            <th >Số lượng</th>
                            <th class="text-center">Thành tiền</th>
                            <th > </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(p => (
                                <tr key={p.id} >
                                    <td className='d-flex justify-content-center align-items-center '>
                                        <div className='d-flex flex-column'>
                                            {p.name}
                                            <img src={p.avartar} alt=''
                                                style={{
                                                    width: '70px',
                                                    height: '80px',
                                                    marginTop: '2px'
                                                }}
                                            />
                                        </div>
                                    </td>

                                    <td className='td__cart'>{numberFormat.format(p.price)}</td>
                                    <td className='td__cart'>
                                        <AmountCart p={p} removeProduct={removeProduct} />

                                    </td>
                                    <td className='td__cart'>{numberFormat.format(p && p.totalCost)}</td>
                                    <td><button className='btn btn-primary' onClick={() => removeProduct(p.id)}>
                                        <MdDelete style={{
                                            fontSize: '20px',

                                        }} />
                                    </button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="total">
                <h4 style={{
                    textAlign: 'center',
                    fontWeight: "800"
                }}>Chi tiết hóa đơn</h4>

                <h5>Tổng cộng: {numberFormat.format(total)} </h5>
                <h5>Số sản phẩm mua: {cart.length} </h5>

                <h5>Phí vận chuyển: 1000 đ </h5>
                <div className='d-flex justify-content-center align-items-center'>
                    <Link to="#" className='btn btn-primary color-white d-flex justify-content-center w-50 m-4' style={{
                        fontWeight: 'bold',
                        textAlign: 'center'

                    }} onClick={() => showModalPayment()}>Thanh toán </Link>
                </div>
            </div>

        </div>


    )
    return (
        <>
            {

                cart.length > 0 ? body :

                    <div className='position-relative' style={{
                        height: '100vh'
                    }}>
                        <div className='position-absolute' style={{
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <div className='d-flex flex-column align-items-center'>
                                <img src='shopping-basket.png' alt='' style={{
                                    width: '30%',

                                }} />
                                <Link to='/' className='w-100 d-flex justify-content-center align-item-center'>
                                    <button className='btn btn-primary mt-5 ' style={{
                                        fontWeight: 'bold',
                                        backgroundColor: 'rgb(255, 57, 69);'
                                    }}>Mua ngay</button>
                                </Link>
                            </div>

                        </div>

                    </div>
            }
            {
                (isPayment && isLoggin) && <PaymentModal setIsPayment={setIsPayment} cart={cart} />

            }
        </>

    )
}

export default Cart
