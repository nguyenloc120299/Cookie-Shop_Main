import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { GlobalContext } from '../../GlobalContext'

const History = () => {
    const context = useContext(GlobalContext)
    const [history, setHistory] = context.ordersApi.history
    return (
        <div className='container'>

            <div className='row'>
                <table class="table table-borderless">
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">#</th>
                            <th scope="col">Sản phẩm</th>

                            <th scope="col">Số lượng</th>
                            <th scope="col">Ngày đặt</th>
                            <th scope="col">Thanh toán</th>
                            <th scope="col">Tổng tiền</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            history && history.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {index}
                                    </td>
                                    <td>
                                        <div className='d-flex flex-column justify-content-center'>
                                            <div className='d-flex justify-content-center'>{item.name}</div>
                                            <div className='d-flex justify-content-center'>
                                                <img src={item.avartar} alt='' style={{
                                                    width: '5rem',
                                                    objectFit: "cover"
                                                }} />
                                            </div>

                                        </div>

                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>{item.dateOrder}</td>
                                    <td style={item.payments === 1
                                        ? { color: 'green', fontWeight: 'bold' }
                                        : { color: 'blue', fontWeight: "bold" }}

                                    >{item.payments === 1 ? 'Trực tiếp' : 'Online'}</td>
                                    <td>{item.total}</td>

                                    {
                                        item.status === 3 && <p className='text-success' style={{
                                            fontWeight: 'bold'
                                        }}>Đã giao</p>
                                    }

                                </tr>
                            ))

                        }


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default History
