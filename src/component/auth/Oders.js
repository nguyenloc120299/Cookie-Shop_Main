
import React, { useContext, useEffect, useState } from 'react'

import ProCessStep from '../home/cart/ProCessStep'
import { GlobalContext } from '../../GlobalContext'
import Loading from '../view/Loading'
import { apiInstance } from '../../baseApi'
import { Button } from 'bootstrap'
import swal from 'sweetalert'
const Oders = () => {
    const context = useContext(GlobalContext)
    const [myOrders] = context.ordersApi.orders
    const [callBack, setCallBack] = context.ordersApi.callBack
    const [isLoading, setIsLoading] = useState(false)
    const { id } = JSON.parse(localStorage.getItem('login_admin_main'))
    const [statusValue, setStatusValue] = useState('')
    const [isShowModal, setIsShowModal] = useState(false)
    const handleClickStatus = (item) => {
        setIsShowModal(true)
        setStatusValue(item)
    }

    const cancelOrder = async (id) => {

        try {
            setIsLoading(true)
            await apiInstance.delete(`/orderdetails/${id}/type/0`)
            swal('Hủy thành công', '', 'success')
            setIsLoading(false)
            setCallBack(!callBack)
        } catch (error) {
            setIsLoading(false)
            swal('Có lỗi xảy ra vui lòng thử lại sau ', '', 'error')
        }


    }
    // const getOrders = async () => {
    //     setIsLoading(true)
    //     let data = []
    //     const res = await apiInstance.get(`/orders/users/${id}`)
    //     if (res && res.data) {

    //         res.data.forEach(item => {
    //             item.listOrderDetail.forEach(element => {
    //                 data.push({
    //                     name: element.name,
    //                     dateOrder: item.dateorder,
    //                     quantity: element.quantity,
    //                     total: element.totalmoney,
    //                     avartar: element.avartar,
    //                     payments: item.payments,
    //                     status: element.status
    //                 })
    //             });
    //         });
    //         setMyOrder(data)
    //         setIsLoading(false)

    //     }
    // }
    // useEffect(() => {
    //     getOrders()
    // }, [])

    return (
        <div className='my_order w-100'>


            <table class="table table-borderless">
                <thead>
                    <tr className='text-center'>
                        <th scope="col">#</th>
                        <th scope="col">Sản phẩm</th>

                        <th scope="col">Số lượng</th>
                        <th scope="col">Ngày đặt</th>
                        <th scope="col">Thanh toán</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col" >Trạng thái</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        myOrders.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {index}
                                </td>
                                <td>
                                    <div className='d-flex flex-column justify-content-center'>
                                        <div style={{ maxWidth: '15rem' }}>
                                            <div>{item.name}</div>
                                            <img src={item.avartar} alt='' style={{
                                                width: '5rem',
                                                objectFit: "cover"
                                            }} />
                                        </div>

                                    </div>

                                </td>
                                <td>{item.quantity}</td>
                                <td>{new Date(item.dateOrder).toLocaleDateString()}</td>
                                <td style={item.payments === 1
                                    ? { color: 'green', fontWeight: 'bold' }
                                    : { color: 'blue', fontWeight: "bold" }}

                                >{item.payments === 1 ? 'Trực tiếp' : 'Online'}</td>
                                <td>{(item.total).toLocaleString()}</td>
                                <td>
                                    <ProCessStep status={item.status} />
                                </td>
                                {

                                    // <button className='btn btn-danger'
                                    //     onClick={() => cancelOrder(item.id)}
                                    // >Hủy đơn hàng</button>
                                    item.status === 0 && <div className='d-flex justify-content-center'>
                                        <img src='delivery-cancelled.png' alt='' style={{
                                            width: '3rem'
                                        }}
                                            onClick={() => cancelOrder(item.id)} />
                                    </div>
                                }
                                {/* {
                                            item.status === 0 && <Button variant="danger">Danger</Button>
                                        } */}

                            </tr>
                        ))

                    }


                </tbody>
            </table>


            {
                isLoading && <Loading />
            }

        </div >
    )
}

export default Oders
