import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import { GrEdit } from 'react-icons/all'
const MyShop = () => {
    const context = useContext(GlobalContext)
    const [users] = context.usersApi.users
    const { id } = JSON.parse(localStorage.getItem('login_admin_main'))

    const [products, setProducts] = useState([])
    useEffect(() => {
        users.forEach(user => {
            if (user.id === id) setProducts(user.products)
        });
    }, [users])

    const [readmore, SetReadMore] = useState(false);
    return (
        <div className='my_shop w-100 h-100'>
            <div className='row__title justify-content-around d-flex'>
                <div className=''>
                    <h3> Tổng cộng {products.length} sản phẩm</h3>
                </div>
                <div className=''>
                    <Link to='add-product' className='btn btn-outline-dark '>+ Thêm 1 sản phẩm mới</Link>
                </div>
            </div>
            <div className='row_table mt-5'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Ảnh </th>
                            <th scope="col">Tên Sản phẩm</th>
                            <th scope="col">Code</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Chi tiết</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item, i) => (
                                <tr key={i}>
                                    <td><img src={item.avartar} alt='' style={{
                                        width: '120px',
                                        height: '150px'
                                    }} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.code}</td>
                                    <td>{item.sort_description}</td>
                                    <td>
                                        <p style={{
                                            textAlign: 'left'
                                        }}>
                                            {readmore ? item.detail_description : `${item.detail_description.substring(0, 150)}...`}

                                            <a href='#' onClick={() => SetReadMore(!readmore)}>
                                                {readmore ? "show" : "readmore"}
                                            </a></p>


                                    </td>

                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td style={item.status === 1 ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }}>{item.status === 1 ? 'Đã duyệt' : 'Chờ duyệt'}</td>
                                    <td><GrEdit style={{ fontSize: '20px' }} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div >
    )
}

export default MyShop
