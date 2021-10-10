import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import { ButtonAddCart } from '../view/ButtonAddCart'
import './detail.css'
const SingleProduct = () => {
    const [detail, setDetail] = useState('')
    const { id } = useParams()
    const context = useContext(GlobalContext)
    const [products] = context.productsApi.products
    const getProduct = async (id) => {
        const res = await axios.get(`/products/${id}`)
        if (res && res.data) setDetail(res.data)
    }
    useEffect(() => {
        if (id) {
            getProduct(id)
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
            <div className='detail' style={{ marginTop: '100px' }}>
                <div className='img-container' style={{ backgroundImage: `url(${detail.avartar})` }} onMouseMove={handleMouseMove}
                    onMouseLeave={() => mouse.current.style.backgroundPosition = 'center'} ref={mouse} />
                <div className="box-detail">
                    <h2 title={detail.name}>{detail.name}</h2>
                    <h3>{detail.price} đ</h3>
                    <p>Còn {detail.quantity} cái</p>

                    <p>{detail.sort_description}</p>

                    {/* <div className='thumb'>
                    {
                        p.images.map((img, i) => (
                            <img src={img} alt='' key={i} onClick={() => setInsex(i)} />
                        ))
                    }
                </div> */}
                    <ButtonAddCart />
                </div>

            </div>
            <h3 style={{
                textAlign: 'left',
                padding: '10px'
            }}>Chi tiết sản phẩm</h3>
            <div className='box__description'>

                <p style={{
                    textAlign: 'left',
                    padding: '10px'
                }}>{detail.detail_description}</p>
            </div>

        </>
    )
}

export default SingleProduct
