
import React, { useContext, useEffect, useRef, useState } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import { Link, NavLink } from 'react-router-dom'
import { apiInstance } from '../../baseApi'
import { GlobalContext } from '../../GlobalContext'
import ButtonSlide from '../langding/Slider/ButtonSlide'
import CardSlide from '../langding/Slider/CardSlide'
import Pagination from '../product/Pagination'
import { ButtonAddCart } from '../view/ButtonAddCart'
import Promotion from '../view/Promotion'
import Banner from './banner/Banner'
import FeatureProduct from './banner/FeatureProduct'
import CardProduct from './CardProduct'
import Loading from '../../component/view/Loading'
import './home.css'
import HotPromotion from './banner/HotPromotion'

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
    const totalItem = 15;
    const [pageNumber, setPageNumber] = useState(0)
    const PageVisited = pageNumber * totalItem
    const pageCount = Math.ceil(products.length / totalItem);
    const [isLoading, setIsLoading] = useState(false)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    const getProductByCategories = async (id) => {
        setIsLoading(true)
        setCategory(id)
        setType('categories')
        const res = await apiInstance.get(`/products/categories/${id}`)
        if (res && res.data) setProducts(res.data);
        setIsLoading(false)
    }
    const getProductBySupplier = async (id) => {
        setIsLoading(true)
        setCategory(id)
        setType('suppliers')
        const res = await apiInstance.get(`/products/supplier/${id}`)
        if (res && res.data) setProducts(res.data);
        setIsLoading(false)
    }
    const sortProductBanChay = async (id, type) => {
        setIsLoading(true)
        if (id) {
            if (type === 'categories') {
                const res = await apiInstance.get(`/products/sellfast/categories/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            } else if (type === 'suppliers') {
                const res = await apiInstance.get(`/products/sellfast/supplier/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            }
        }
        else {
            const res = await apiInstance.get(`/products/sellfast`)

            if (res && res.data) {
                setProducts(res.data)
            }
        }
        setIsLoading(false)
    }

    const newProduct = async (id, type) => {
        setIsLoading(true)
        if (id) {
            if (type === 'categories') {
                const res = await apiInstance.get(`/products/product-new/categories/${id}`)
                if (res && res.data) {
                    setProducts(res.data)
                }
            }
        } else {
            const res = await apiInstance.get(`/products/product-new`)

            if (res && res.data) {
                setProducts(res.data)
            }
        }
        setIsLoading(false)
    }
    const sortProductByPriceIncrease = async (id, type) => {
        setIsLoading(true)
        if (id) {
            if (type === 'categories') {
                const res = await apiInstance.get(` /products/increase/categories/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            } else if (type === 'suppliers') {
                const res = await apiInstance.get(`/products/increase/supplier/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            }
        } else {
            const res = await apiInstance.get(`/products/increase`)

            if (res && res.data) {
                setProducts(res.data)
            }
        }
        setIsLoading(false)
    }
    const sortProductByPriceReduced = async (id, type) => {
        setIsLoading(true)
        if (id) {
            if (type === 'categories') {
                const res = await apiInstance.get(`/products/reduced/categories/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            } else if (type === 'suppliers') {
                const res = await apiInstance.get(`/products/reduced/supplier/${id}`)

                if (res && res.data) {
                    setProducts(res.data)
                }
            }
        } else {
            const res = await apiInstance.get(`/products/reduced`)

            if (res && res.data) {
                setProducts(res.data)
            }
        }
        setIsLoading(false)
    }

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
    const getAll = async () => {
        setIsLoading(true)
        const res = await apiInstance.get('/products')
        setProducts(res.data)
        setIsLoading(false)
    }
    return (
        <div className='product_page'>
            {
                isLoading && <Loading />
            }
            <Banner />
            <HotPromotion />
            <FeatureProduct />

            {/* 
            {
                products.length > 0 ? <> */}



            <div className='product_main'>

                <h3 style={{
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontStyle: 'italic'
                }}>T???t c??? s???n ph???m</h3>

                <div className='d-flex'>
                    <div className='filter_product'>
                        <h5 style={{
                            fontWeight: 'bold',
                            color: 'rgb(26, 148, 255);',
                            fontStyle: "italic"

                        }}>Danh m???c s???n ph???m </h5>
                        <br />
                        <h6 style={{
                            fontWeight: 'bold'
                        }}><img
                                src='https://salt.tikicdn.com/ts/upload/33/0f/67/de89fab36546a63a8f3a8b7d038bff81.png' alt=''
                                style={{
                                    width: '1.5rem',
                                    marginRight: '5px'
                                }}
                            />

                            Th??? lo???i </h6>
                        <ul>


                            {
                                categories.slice(0, 10).map(item => (

                                    <li>     <NavLink exact activeClassName='active_choose' to='#' key={item.id} style={{

                                        paddingTop: '2px',
                                        cursor: 'pointer'
                                    }} className='item_filter'
                                        onClick={() => getProductByCategories(item.id)}
                                    > {item.name}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>

                        <hr />

                        <h6 style={{
                            fontWeight: 'bold',
                            paddingTop: "1rem",

                        }}
                        > <img src='https://salt.tikicdn.com/ts/upload/c7/ee/c2/d52a63b18732d5a77a9be29e7c3623a2.png'
                            alt=''
                            style={{
                                width: '1.5rem',
                                margin: '5px'
                            }} />
                            Nh?? cung c???p</h6>
                        <ul>

                            {
                                suppliers.slice(0, 10).map(item => (
                                    <li><NavLink exact activeClassName='active_choose' to='#' key={item.id} style={{

                                        paddingTop: '2px',
                                        cursor: "pointer"
                                    }} className='item_filter'
                                        onClick={() => getProductBySupplier(item.id)}
                                    > {item.name}</NavLink></li>
                                ))
                            }
                        </ul>
                    </div>
                    {products.length > 0 ?
                        <div className='products '>

                            <div className='sort_product d-flex justify-content-around align-items-center'>
                                <h6>S???p x???p theo</h6>
                                <button onClick={() => getAll()}>T???t c???</button>
                                <button onClick={() => newProduct(idCategory, type)}>M???i nh??t</button>
                                <button onClick={() => sortProductBanChay(idCategory, type)}>B??n ch???y</button>
                                <button className='dropdown' style={{
                                    width: '10rem'
                                }}>
                                    <div className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                                        Gi??
                                    </div>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown p-5">
                                        <li><Link to='#' className="dropdown-item dropdown_item" href="#" onClick={() => sortProductByPriceIncrease(idCategory, type)}>T??? th???p t???i cao</Link></li>
                                        <li><Link to='#' className="dropdown-item  dropdown_item" href="#" onClick={() => sortProductByPriceReduced(idCategory, type)}>T??? cao t???i th??p</Link></li>
                                    </ul>
                                </button>
                            </div>


                            {
                                productsTotal.slice(PageVisited, PageVisited + totalItem).map(product => (

                                    <CardProduct key={product.id} product={product} />
                                ))
                            }

                        </div>
                        :
                        <h1 className='position-absolute ' style={{
                            top: '60%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)'
                        }}>Ch??a c?? s???n ph???m</h1>
                    }
                </div>
            </div>
            <div className='products mt-3 mb-5'>
                <Pagination
                    pageCount={pageCount}
                    changePage={changePage} />
            </div>
            {/* </> : <h1 className='position-absolute' style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)'
                }}>Ch??a c?? s???n ph???m</h1>
            } */}

        </div>
    )
}

export default Product
