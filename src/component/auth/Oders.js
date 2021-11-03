import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiDetail } from 'react-icons/all'
const Oders = () => {
    const [myOrders, setMyOrder] = useState([])
    const { id } = JSON.parse(localStorage.getItem('login_admin_main'))
    const getOrders = async () => {
        const res = await axios.get(`/orders/users/${id}`)
        if (res && res.data) {
            setMyOrder(res.data)

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
                        <th scope="col">Số lượn sản phẩm</th>
                        <th scope="col">Ngày đặt</th>
                        <th scope="col">Hình thức thanh toán</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myOrders.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {index}
                                </td>
                                <td>{item.listOrderDetail.length}</td>
                                <td>{item.dateorder}</td>
                                <td style={item.payments === 1
                                    ? { color: 'green', fontWeight: 'bold' }
                                    : { color: 'blue', fontWeight: "bold" }}

                                >{item.payments === 1 ? 'Trực tiếp' : 'Online'}</td>
                                <td></td>
                                <td style={{
                                    fontSize: '2rem'
                                }}><BiDetail /></td>
                            </tr>
                        ))

                    }


                </tbody>
            </table>
        </div >
    )
}

export default Oders
