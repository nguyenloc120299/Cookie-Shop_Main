import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import ButtonSlide from '../langding/Slider/ButtonSlide'
import CardSlide from '../langding/Slider/CardSlide'
import Pagination from '../product/Pagination'
import { ButtonAddCart } from '../view/ButtonAddCart'
import Promotion from '../view/Promotion'
import Banner from './banner/Banner'

import './home.css'

const Product = () => {
    const context = useContext(GlobalContext)
    const [products] = context.productsApi.products

    const [listSlide, setListSlide] = useState([])
    const listRef = useRef()
    const totalItem = 14;
    const [pageNumber, setPageNumber] = useState(0)
    // const PageVisited = pageNumber * totalItem
    const pageCount = Math.ceil(products.length / totalItem);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const numberFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    useEffect(() => {
        let arr = []
        products.forEach(p => {
            if (p.featured === 1) arr.push(p)
        });
        setListSlide(arr)
    }, [products])

    const productsTotal = products.filter(item => {
        return item.status === 1
    })

    return (
        <div className='product_page'>
            <Banner />

            {
                products.length > 0 ? <>

                    <div className='w-100 abount home-slider'>

                        {/* <h4 style={{
                            textAlign: 'left',
                            margin: '10px'
                        }}>Sản phẩm nổi bật</h4>
                        <div className='landing-slider' >
                            <div className='slider__products' ref={listRef}>
                                {
                                    listSlide.map((item, i) => (

                                        <CardSlide item={item} key={item.id} />


                                    ))

                                }

                            </div>
                            <ButtonSlide listRef={listRef} />
                        </div> */}

                    </div>

                    <div className='product_main'>
                        {/* <h4 style={{


                        }}>Tất cả sản phẩm</h4> */}

                        <div className='sort_product d-flex justify-content-around align-items-center'>
                            <div>Sắp xếp theo</div>
                            <button>Tất cả</button>
                            <button>Mới nhât</button>
                            <button>Bán chạy</button>
                            <button className='dropdown' style={{
                                width: '10rem'
                            }}>
                                <div className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                                    Giá
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown p-5">
                                    <li><Link to='#' className="dropdown-item dropdown_item" href="#">Từ thấp tới cao</Link></li>
                                    <li><Link to='#' className="dropdown-item  dropdown_item" href="#">Từ cao tới thâp</Link></li>
                                </ul>
                            </button>
                        </div>
                        <div className='products '>


                            {
                                productsTotal.map(product => (

                                    <div className='card__product' key={product.id}>

                                        <Link className='card__product__img' to={`/detail/${product.id}`}>
                                            <img src={product.avartar} alt='' />
                                        </Link>
                                        <div className='box'>
                                            {product.promotion > 0 && <Promotion value={product.promotion} />}
                                            <Link to={`/detail/${product.id}`}><h4>{product.name}</h4></Link>
                                            <p>{product.sort_description}</p>
                                            <div className='d-flex justify-content-around'>
                                                <h5>{numberFormat.format(product.competitive_price)}</h5>
                                                <p className='text-dark'>Đã bán {product.ban_nhanh}</p>
                                            </div>
                                            <ButtonAddCart id={product.id} />

                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                    </div>
                    <div className='products mt-3 mb-5'>
                        <Pagination
                            pageCount={pageCount}
                            changePage={changePage} />
                    </div>
                </> : <h1 className='position-absolute' style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)'
                }}>Chưa có sản phẩm</h1>
            }

        </div>
    )
}

export default Product
