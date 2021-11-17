import React from 'react'


const ProductPayMent = ({ cart }) => {

    console.log(cart);
    return (
        <div className='product_payment'>

            <table className='table table-borderless'>
                <thead>
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                </thead>
                <tbody>
                    {
                        cart.map(item => (
                            <tr key={item.id}>
                                <td className='d-flex justify-content-start'>
                                    <img src={item.avartar} alt='' style={{
                                        width: '50px',
                                        height: '70px',
                                        marginRight: '1rem'
                                    }} />
                                    <h5>{item.name}</h5>
                                </td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.totalCost}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductPayMent
