import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GrStatusUnknown } from 'react-icons/all'
import ProCessStep from '../home/cart/ProCessStep'
import { GlobalContext } from '../../GlobalContext'
import Loading from '../view/Loading'
const Oders = () => {
    const context = useContext(GlobalContext)
    const [myOrders] = context.ordersApi.orders

    const { id } = JSON.parse(localStorage.getItem('login_admin_main'))
    const [statusValue, setStatusValue] = useState('')
    const [isShowModal, setIsShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const handleClickStatus = (item) => {
        setIsShowModal(true)
        setStatusValue(item)
    }
    // const getOrders = async () => {
    //     setIsLoading(true)
    //     let data = []
    //     const res = await axios.get(`/orders/users/${id}`)
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
            {
                isLoading ? <Loading /> :

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
                                                <div>{item.name}</div>
                                                <img src={item.avartar} alt='' style={{
                                                    width: '5rem',
                                                    objectFit: "cover"
                                                }} />

                                            </div>

                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{item.dateOrder}</td>
                                        <td style={item.payments === 1
                                            ? { color: 'green', fontWeight: 'bold' }
                                            : { color: 'blue', fontWeight: "bold" }}

                                        >{item.payments === 1 ? 'Trực tiếp' : 'Online'}</td>
                                        <td>{item.total}</td>
                                        <td>
                                            <ProCessStep status={item.status} />
                                        </td>

                                    </tr>
                                ))

                            }


                        </tbody>
                    </table>

            }
        </div >
    )
}

export default Oders
