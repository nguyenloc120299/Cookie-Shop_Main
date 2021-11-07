import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiDetail } from 'react-icons/all'
const Oders = () => {
    const [myOrders, setMyOrder] = useState([])
    const { id } = JSON.parse(localStorage.getItem('login_admin_main'))
    const getOrders = async () => {
        let data = []
        const res = await axios.get(`/orders/users/${id}`)
        if (res && res.data) {
            res.data.forEach(item => {
                item.listOrderDetail.forEach(element => {
                    data.push({
                        name: element.name,
                        dateOrder: item.dateorder,
                        quantity: element.quantity,
                        total: element.discount,
                        avartar: element.avartar,
                        payments: item.payments,
                        status: element.status
                    })
                });
            });
            setMyOrder(data)


        }
    }
    useEffect(() => {
        getOrders()
    }, [])
    console.log(myOrders);
    return (
        <div className='my_order w-100'>
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sản phẩm</th>

                        <th scope="col">Số lượng sản phẩm</th>
                        <th scope="col">Ngày đặt</th>
                        <th scope="col">Hình thức thanh toán</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>

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
                                <td
                                    style={item.status === 0
                                        ? { color: 'green', fontWeight: 'bold' }
                                        : { color: 'blue', fontWeight: "bold" }}
                                >{item.status === 0 ? 'Chưa xác nhận' : 'Đã giao hàng'}</td>

                            </tr>
                        ))

                    }


                </tbody>
            </table>
        </div >
    )
}

export default Oders
