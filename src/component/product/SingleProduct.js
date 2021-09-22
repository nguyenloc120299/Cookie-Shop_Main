import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import { ButtonAddCart } from '../view/ButtonAddCart'
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
        <div className='single' style={{ marginTop: '100px' }}>
            <div className='row mt-5'>
                <div className='col col-12 col-md-4 col-lg-4' >

                    <img src={detail.avartar} alt=''
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => mouse.current.style.backgroundPosition = 'center'}
                        ref={mouse} />
                </div>
                <div className="col col-12 col-md-4 col-lg-4 " style={{
                    textAlign: 'left'
                }}>
                    <h3 title={detail.name}>{detail.name}</h3>
                    <h4>{detail.sort_description}</h4>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>{detail.price} Đ</span>
                    <p>Còn {detail.quantity} cái</p>
                    <ButtonAddCart id={detail.id} />
                </div>
                <div className="col col-12 col-md-4 col-lg-4">

                    <h5>Mô tả sản phẩm</h5>
                    <p>{detail.detail_description}</p>


                </div>

            </div>
        </div>
    )
}

export default SingleProduct
