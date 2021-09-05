import React, { useContext, useState } from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../../GlobalContext'
import { MdDelete } from 'react-icons/md'
const Cart = () => {
    const context = useContext(GlobalContext)
    const [cart, setCart] = context.cart
    const [total, setTotal] = useState(0)
    const reduction = id => {
        cart.forEach(item => {
            if (item._id === id) {
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        })
        setCart([...cart])
    }

    const increase = id => {
        cart.forEach(item => {
            if (item._id === id) {
                item.count += 1;
            }
        })
        setCart([...cart])
    }

    const removeProduct = id => {
        if (window.confirm("Bạn muốn xóa")) {
            cart.forEach((item, index) => {
                if (item.id === id) {
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
        }
    }
    return (
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
                                    <td className='td__cart'>{p.price}</td>
                                    <td className='td__cart'>
                                        <div className="amount" >
                                            <button className="btn btn-outline-dark" onClick={() => reduction(p._id)}> - </button>
                                            <span style={{
                                                marginLeft: '20px',
                                                marginRight: '20px'
                                            }}>0</span>
                                            <button className="btn btn-outline-dark" onClick={() => increase(p._id)}> + </button>
                                        </div>

                                    </td>
                                    <td className='td__cart'>0</td>
                                    <td><MdDelete className='text-danger' style={{
                                        fontSize: '30px',

                                    }} onClick={() => removeProduct(p.id)} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="total">
                <Link to="/payment" className='btn btn-outline-dark' style={{
                    fontWeight: 'bold'
                }}>Payment</Link>
                <h5>Total: ${total}</h5>
            </div>
        </>
    )
}

export default Cart
