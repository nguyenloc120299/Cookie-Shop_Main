import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import CardProduct from '../home/CardProduct'
import './store.css'
const Store = () => {

    const { id } = useParams()
    const context = useContext(GlobalContext)
    const [stores] = context.storesApi.stores
    const [productStore, setProductStore] = useState([])
    const [store] = stores.filter(item => item.id == id)
    const [callBack, setCallBack] = useState(false)
    const [categories] = context.categories
    const getProductStore = async (id) => {
        const res = await axios.get(`/products/store/${id}`)
        if (res && res.data) setProductStore(res.data)
    }
    useEffect(() => {
        getProductStore(id)
    }, [id, callBack])
    // console.log(productStore);
    return (
        <div className='store_page'>
            <div className='row'>
                <div className='d-flex justify-content-around flex-wrap'>
                    <img src={store && store.logo} alt='' style={{
                        width: '10rem',
                        height: '10rem',
                        borderRadius: '50%'
                    }} />
                    <div className='d-flex flex-column' style={{
                        fontSize: "27px",
                        fontWeight: '700',
                        alignItems: 'center'
                    }}>
                        <div className='name_store mb-2'>{store && store.name}</div>
                        <div className='date_create'>{store && store.dateStore}</div>
                    </div>
                </div>
            </div>
            <div className='row '>
                <div className='sort_product d-flex justify-content-around align-items-center'>
                    <h6>Sắp xếp theo</h6>
                    <button>Tất cả</button>
                    <button>Mới nhât</button>
                    <button >Bán chạy</button>
                    <button className='dropdown' style={{
                        width: '10rem'
                    }}>
                        <div className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                            Giá
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown p-5">
                            <li><Link to='#' className="dropdown-item dropdown_item" href="#" >Từ thấp tới cao</Link></li>
                            <li><Link to='#' className="dropdown-item  dropdown_item" href="#" >Từ cao tới thâp</Link></li>
                        </ul>
                    </button>
                </div>
            </div>
            <div className='row'>
                <div className='col col-12 col-lg-3' style={{
                    height: '100%',
                    overflow: 'hidden'
                }}>
                    <div className='filter_product'>
                        <h5 tyle={{
                            fontWeight: 'bold'
                        }}>Danh mục sản phẩm </h5>
                        <br />
                        <h6 tyle={{
                            fontWeight: 'bold'
                        }}>Thể loại </h6>


                        {
                            categories.slice(0, 5).map(item => (
                                <div key={item.id} style={{

                                    paddingTop: '2px',
                                    cursor: 'pointer'
                                }} className='item_filter'

                                > {item.name} ({item.totalproduct})</div>
                            ))
                        }


                        <hr />
                    </div>
                </div>
                <div className='col col-12 col-lg-9'>


                    {
                        productStore.map(item => (
                            <CardProduct key={item.id} product={item} />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Store
