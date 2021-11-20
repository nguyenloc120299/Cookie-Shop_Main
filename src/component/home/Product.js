import axios from 'axios'
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
    const [products, setProducts] = context.productsApi.products
    const [callBack, setCallback] = context.productsApi.callBack
    const [categories] = context.categories
    const [suppliers] = context.suppliers
    const [type, setType] = useState('')
    const [idCategory, setCategory] = useState('')
    const [listSlide, setListSlide] = useState([])
    const listRef = useRef()
    const totalItem = 14;
    const [pageNumber, setPageNumber] = useState(0)
    // const PageVisited = pageNumber * totalItem
    const pageCount = Math.ceil(products.length / totalItem);
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const getProductByCategories = async (id) => {
        setCategory(id)
        setType('categories')
        const res = await axios.get(`/products/categories/${id}`)
        if (res && res.data) setProducts(res.data);
    }
    const getProductBySupplier = async (id) => {
        setCategory(id)
        setType('suppliers')
        const res = await axios.get(`/products/supplier/${id}`)
        if (res && res.data) setProducts(res.data);
    }
    const sortProductBanChay = async (id, type) => {
        if (id) {
            if (type === 'categories') {
                const res = await axios.get(`/products/sellfast/categories/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            } else if (type === 'suppliers') {
                const res = await axios.get(`/products/sellfast/supplier/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            }
        }
        else {
            const res = await axios.get(`/products/sellfast`)

            if (res && res.data) {
                setProducts(res.data)
            }
        }
    }
    const sortProductByPriceIncrease = async (id, type) => {

        if (id) {
            if (type === 'categories') {
                const res = await axios.get(` /products/increase/categories/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            } else if (type === 'suppliers') {
                const res = await axios.get(`/products/increase/supplier/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            }
        } else {
            const res = await axios.get(`/products/increase`)

            if (res && res.data) {
                setProducts(res.data)
            }
        }
    }
    const sortProductByPriceReduced = async (id, type) => {
        if (id) {
            if (type === 'categories') {
                const res = await axios.get(`  /products/reduced/categories/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            } else if (type === 'suppliers') {
                const res = await axios.get(`  /products/reduced/supplier/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            }
        } else {
            const res = await axios.get(`  /products/reduced/`)

            if (res && res.data) {
                setProducts(res.data)
            }
        }
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


                    </div>

                    <div className='product_main'>



                        <div className='d-flex'>
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
                                            onClick={() => getProductByCategories(item.id)}
                                        > {item.name} ({item.totalproduct})</div>
                                    ))
                                }


                                <hr />

                                <h6 style={{
                                    fontWeight: 'bold',
                                    paddingTop: "1rem",

                                }}
                                >Nhà cung cấp</h6>

                                {
                                    suppliers.slice(0, 5).map(item => (
                                        <div key={item.id} style={{

                                            paddingTop: '2px',
                                            cursor: "pointer"
                                        }} className='item_filter'
                                            onClick={() => getProductBySupplier(item.id)}
                                        > {item.name} ({item.products && item.products.length})</div>
                                    ))
                                }
                            </div>
                            <div className='products '>
                                <div className='sort_product d-flex justify-content-around align-items-center'>
                                    <h6>Sắp xếp theo</h6>
                                    <button onClick={() => setCallback(!callBack)}>Tất cả</button>
                                    <button>Mới nhât</button>
                                    <button onClick={() => sortProductBanChay(idCategory, type)}>Bán chạy</button>
                                    <button className='dropdown' style={{
                                        width: '10rem'
                                    }}>
                                        <div className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                                            Giá
                                        </div>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown p-5">
                                            <li><Link to='#' className="dropdown-item dropdown_item" href="#" onClick={() => sortProductByPriceIncrease(idCategory, type)}>Từ thấp tới cao</Link></li>
                                            <li><Link to='#' className="dropdown-item  dropdown_item" href="#" onClick={() => sortProductByPriceReduced(idCategory, type)}>Từ cao tới thâp</Link></li>
                                        </ul>
                                    </button>
                                </div>


                                {
                                    productsTotal.map(product => (

                                        <div className='card__product' key={product.id}>

                                            {/* <Link className='card__product__img' to={`/detail/${product.id}`}> */}
                                            <img src={product.avartar} alt='' />
                                            {/* </Link> */}
                                            <div className='box'>
                                                {product.promotion > 0 && <Promotion value={product.promotion} />}
                                                <Link to={`/detail/${product.id}`}><h5>{product.name}</h5></Link>
                                                <p>{product.sort_description}</p>
                                                <div className='d-flex justify-content-around'>
                                                    <h5>{numberFormat.format(product.competitive_price)}</h5>
                                                    <p className='text-dark' style={{
                                                        color: 'rgb(120, 120, 120)'
                                                    }}>Đã bán {product.ban_nhanh}</p>
                                                </div>
                                                <ButtonAddCart id={product.id} />

                                            </div>

                                        </div>
                                    ))
                                }

                            </div>
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
