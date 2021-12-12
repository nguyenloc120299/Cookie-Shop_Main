import React, { useContext } from 'react'
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

                                    {/* {
                                            item.status === 0 && <Button variant="danger">Danger</Button>
                                        } */}

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
