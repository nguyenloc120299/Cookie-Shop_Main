import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import ButtonSlide from '../langding/Slider/ButtonSlide'
import CardSlide from '../langding/Slider/CardSlide'
import Pagination from '../product/Pagination'
import './home.css'
const Product = () => {
    const context = useContext(GlobalContext)
    const [products] = context.productsApi.products
    const addCart = context.addCart
    const [listSlide, setListSlide] = useState([])
    const listRef = useRef()
    const totalItem = 14;
    const [pageNumber, setPageNumber] = useState(0)
    const PageVisited = pageNumber * totalItem
    const pageCount = Math.ceil(products.length / totalItem);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    useEffect(() => {
        let arr = []
        products.forEach(p => {
            if (p.featured === 1) arr.push(p)
        });
        setListSlide(arr)
    }, [products])
    return (
        <>
            <div className='products'>
                <div className='w-100 abount home-slider mt-5'>

                    <h4 style={{
                        textAlign: 'left',
                        margin: '10px'
                    }}>Sản phẩm nổi bật</h4>
                    <div className='landing-slider mt-5' >
                        <div className='slider__products' ref={listRef}>
                            {
                                listSlide.map((item, i) => (
                                    <>
                                        <CardSlide item={item} key={item.id} />

                                    </>
                                ))

                            }

                        </div>
                        <ButtonSlide listRef={listRef} />
                    </div>
                    <h4 style={{
                        textAlign: 'left',
                        margin: '10px'
                    }}>Tất cả sản phẩm</h4>
                </div>

                {
                    products.map(product => (
                        <div className='card__product mt-5' key={product.id}>
                            <Link to={`detail/${product._id}`}>
                                <img src={product.avartar} alt='' />
                            </Link>
                            <div className='box'>
                                <Link to=''><h4>{product.name}</h4></Link>
                                <p>{product.sort_description}</p>
                                <h5>{product.price}</h5>
                                <button className='btn btn-outline-dark w-100' onClick={() => addCart(product.id)} >
                                    Mua ngay
                                </button>

                            </div>
                        </div>
                    ))
                }

            </div>
            <div className='products mt-3 mb-5'>
                <Pagination
                    pageCount={pageCount}
                    changePage={changePage} />
            </div>
        </>
    )
}

export default Product
