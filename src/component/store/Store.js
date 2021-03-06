
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiInstance } from '../../baseApi'
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
    const [id_Cate, setId_Cate] = useState(null)
    const getProductStore = async (id) => {
        const res = await apiInstance.get(`/products/store/${id}`)
        if (res && res.data) setProductStore(res.data)
        setId_Cate(null)
    }

    useEffect(() => {
        getProductStore(id)
    }, [id, callBack])

    const getProductByCategorie = async (id_Cate) => {
        setId_Cate(id)
        const res = await apiInstance.get(`/products/categories/${id_Cate}/store/${id}`)
        setProductStore(res.data)
    }
    const getProductStoreFilter = async (idCate, type) => {
        // if (idCate) {
        //     if (type === 1) {
        //         const res = await apiInstance.get(`/products/sellfast/categories/${idCate}/store/${id}`)
        //         setProductStore(res.data)
        //     }
        //     if (type === 2) {
        //         const res = await apiInstance.get(`/products/increase/categories/${idCate}/store/${id}`)
        //         setProductStore(res.data)
        //     }
        //     if (type === 3) {
        //         const res = await apiInstance.get(`/products/reduced/categories/${idCate}/store/${id}`)
        //         setProductStore(res.data)
        //     }

        // }
        //  else {
        if (type == 1) {
            const res = await apiInstance.get(`/products/sellfast/store/${id}`)
            setProductStore(res.data)
        }
        if (type == 2) {
            const res = await apiInstance.get(`/products/increase/store/${id}`)
            setProductStore(res.data)
        }
        if (type == 3) {
            const res = await apiInstance.get(`/products/reduced/store/${id}`)
            setProductStore(res.data)
        }
        //}
    }
    useEffect(() => {
        getProductStore(id_Cate)
    }, [id_Cate])

    return (
        <div className='store_page' style={{
            paddingTop: '6rem',
            paddingBottom: '6rem'
        }}>
            <div className='row'>
                <div className='py-5'>
                    <div className='d-flex justify-content-around flex-wrap store_header align-items-center'>
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
                            <div className='name_store mb-2 text-white'>{store && store.name}</div>
                            <div className='date_create text-white'>{store && store.dateStore}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row '>
                <div className='sort_product d-flex justify-content-around align-items-center'>
                    <h6>S???p x???p theo</h6>
                    <button onClick={() => getProductStore(id)}>T???t c???</button>
                    {/* <button>M???i nh??t</button> */}
                    <button onClick={() => getProductStoreFilter(id_Cate, 1)} >B??n ch???y</button>
                    <button className='dropdown' style={{
                        width: '10rem'
                    }}>
                        <div className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                            Gi??
                        </div>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown p-5">
                            <li><Link to='#' className="dropdown-item dropdown_item" href="#" onClick={() => getProductStoreFilter(id_Cate, 2)}>T??? th???p t???i cao</Link></li>
                            <li><Link to='#' className="dropdown-item  dropdown_item" href="#" onClick={() => getProductStoreFilter(id_Cate, 3)}>T??? cao t???i th??p</Link></li>
                        </ul>
                    </button>
                </div>
            </div>
            <div className='row'>
                {/* <div className='col col-12 col-lg-2' style={{
                    height: '100%',
                    overflow: 'hidden'
                }}>
                    <div className='filter_product'>
                        <h5 style={{
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            maxWidth: '12rem'
                        }}>Danh m???c s???n ph???m </h5>
                        <br />
                        <h6 style={{
                            fontWeight: 'bold'
                        }}>Th??? lo???i </h6>


                        {
                            categories.slice(0, 5).map(item => (
                                <div key={item.id} style={{

                                    paddingTop: '2px',
                                    cursor: 'pointer'
                                }} className='item_filter'

                                    onClick={() => getProductByCategorie(item.id)} > {item.name}</div>
                            ))
                        }


                        <hr />
                    </div>
                </div> */}
                <div className=' d-flex justify-content-center flex-wrap'>


                    {
                        productStore.map(item => (
                            <CardProduct key={item.id} product={item} />
                        ))
                    }

                </div>
            </div>
        </div >
    )
}

export default Store
