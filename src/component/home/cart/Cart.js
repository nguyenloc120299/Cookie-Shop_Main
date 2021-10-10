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
    let body = (
        <>


            <div class="cart">


                <table class="table table-hover table-condensed table__cart">
                    <thead>
                        <tr>
                            <th ></th>
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
                                <tr key={p.id}>
                                    <td><img src={p.avartar} alt=''
                                        style={{
                                            width: '150px',
                                            height: '200px'
                                        }}
                                    /></td>
                                    <td className='td__cart'>{p.name}</td>
                                    <td className='td__cart'>{numberFormat.format(p.price)}</td>
                                    <td className='td__cart'>
                                        <AmountCart p={p} removeProduct={removeProduct} />

                                    </td>
                                    <td className='td__cart'>{numberFormat.format(p && p.totalCost)}</td>
                                    <td><button className='btn btn-outline-dark' onClick={() => removeProduct(p.id)}>
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
                <Link to="#" className='btn btn-outline-dark' style={{
                    fontWeight: 'bold'
                }} onClick={() => setIsPayment(true)}>Thanh toán </Link>
                <h5>Tổng cộng: {numberFormat.format(total)} </h5>
            </div>
            {
                isPayment && <PaymentModal setIsPayment={setIsPayment} cart={cart} />
            }
        </>
    )
    return (
        <>
            {
                cart.length > 0 ? body : <h1 className='position-absolute' style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>Không có sản phẩm</h1>
            }
        </>

    )
}

export default Cart
