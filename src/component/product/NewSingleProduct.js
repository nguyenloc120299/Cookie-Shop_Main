import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import AmountCart from '../home/cart/AmountCart'
import { ButtonAddCart } from '../view/ButtonAddCart'

import './detail.css'
const SingleProduct = () => {
    const [detail, setDetail] = useState('')
    const { id } = useParams()
    const context = useContext(GlobalContext)
    const [products] = context.productsApi.products
    const [categories, setCategories] = useState('')
    const [nameSupplier, setNameSupplier] = useState('')
    const [index, setInsex] = useState(0)
    const [infoStore, setInfoStore] = useState('')
    const getCategorie = async (id) => {
        try {
            const res = await axios.get('/categories')

            res.data.forEach(element => {
                element.products && element.products.forEach(item => {
                    if (id == item.id) setCategories(element.name)
                })
            });
        } catch (error) {
            console.log(error);
        }

    }
    const getStore = async (id) => {
        try {
            const res = await axios.get(`/store/product/${id}`)
            if (res && res.data) setInfoStore(res.data)
        } catch (error) {
            console.log(error);
        }

    }
    const getProduct = async (id) => {
        products && products.forEach(p => {
            if (p.id == id) setDetail(p)
        });
        //const res = await axios.get(`/products/${id}`)
        //      if (res && res.data) setDetail(res.data)
    }
    const numberFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const getSupplier = async (id) => {
        try {
            const res = await axios.get('/suppliers')

            res.data.forEach(element => {
                element.products && element.products.forEach(item => {
                    if (id == item.id) setNameSupplier(element.name)
                })
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (id) {
            getProduct(id)
            getCategorie(id)
            getSupplier(id)
            getStore(id)
        }
    }, [id, products])
    const mouse = useRef()
    const handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        mouse.current.style.backgroundPosition = `${x}% ${y}%`
    }
    return (

        <>
            <div className='detail' style={{ marginTop: '100px' }} >
                <div>
                    <div className='img-container' style={{ backgroundImage: `url(${detail && detail.listPictureproduct && detail.listPictureproduct[index].file})` }} onMouseMove={handleMouseMove}
                        onMouseLeave={() => mouse.current.style.backgroundPosition = 'center'} ref={mouse} />
                    <div className='thumb'>

                        {
                            detail && detail.listPictureproduct.map((item, index) => (
                                <img src={item.file} key={index} alt='' onClick={() => setInsex(index)} />
                            ))
                        }


                    </div>

                </div>
                <div className="box-detail" style={{
                    textAlign: 'left'
                }}>
                    <h2 title={detail.name}>{detail.name}</h2>
                    {
                        detail.promotion > 0 ? <div className='detail_promotion d-flex align-items-center'>
                            <h3 style={{
                                marginRight: '2rem'
                            }}><strike>{numberFormat.format(detail.price)}</strike></h3>

                            <h3 style={{
                                marginRight: '2rem'
                            }}>{numberFormat.format(detail.competitive_price)}</h3>

                            <div className='d-flex justify-content-center align-items-center promotion_detail'>{detail.promotion}% Giảm</div>
                        </div>
                            : <h3>{numberFormat.format(detail.price)}</h3>
                    }



                    <h6>{detail.sort_description}</h6>
                    <AmountCart p={detail} />
                    <div className='d-flex justify-content-start'>
                        <h6 >Đã bán được {detail && detail.listOrderDetail.length > 0 ? detail.listOrderDetail.length : 0} sản phẩm</h6>
                        <h6 style={{
                            marginLeft: '3rem'
                        }}> {detail.quantity} sản phẩm có sẵn</h6>
                    </div>

                    {/* <div className='thumb'>
                    {
                        p.images.map((img, i) => (
                            <img src={img} alt='' key={i} onClick={() => setInsex(i)} />
                        ))
                    }
                </div> */}
                    <div className='d-flex justify-content-start'>
                        <ButtonAddCart id={detail.id} />
                    </div>
                    {
                        infoStore &&

                        <div className='info_store mt-3'>
                            <div className='d-flex justify-content-around align-items-center'>
                                <img src={infoStore.logo}
                                    alt='' />



                                <div className='d-flex justify-content-around flex-column'>
                                    <span style={{
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}>{infoStore.name}</span>
                                    <Link to={`/store/${infoStore.id}`} className='action_store'><img src="https://salt.tikicdn.com/ts/upload/49/27/ff/d735c33edfdc6cf6aeb6e183bec28869.png" alt='' />
                                        <span>Xem Shop</span></Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            </div>
            <div className='d-flex'>


                <div className='box__description'>
                    <h3 style={{
                        textAlign: 'left',
                        padding: '10px'
                    }}>Chi tiết sản phẩm</h3>
                    <div className='d-flex mb-3'>
                        <h5>Thể loại</h5>
                        <p>{categories}</p>
                    </div>
                    <div className='d-flex'>
                        <h5>Thể loại</h5>
                        <p>{nameSupplier}</p>
                    </div>
                    <div className='d-flex flex-column'>
                        <h5 className='text-left'>Mô tả sản phẩm</h5>
                        <p style={{
                            textAlign: 'left',

                        }}>{detail.detail_description}</p>
                    </div>


                </div>
                <div style={{
                    width: "30%"
                }}>Bán chạy</div>

            </div>
        </>
    )
}

export default SingleProduct
