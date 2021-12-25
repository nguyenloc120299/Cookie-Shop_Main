import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { apiInstance } from '../../baseApi'
import Loading from '../view/Loading'
import LoadingPage from '../view/Loading'
import CardProduct from './CardProduct'
import Product from './Product'
const SearchPage = () => {
    const location = useLocation()
    const valueSearch = location.search.slice(1);
    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const getProductSearch = async (valueSearch) => {
            setIsLoading(true)
            const res = await apiInstance.post('/products/searchtext', {
                searchtext: valueSearch
            })
            console.log(res.data);
            setProduct(res.data)
            setIsLoading(false)
        }

        getProductSearch(valueSearch)
    }, [valueSearch])

    return (
        <div className='container' style={{
            minHeight: '100vh',
            paddingTop: '7rem',
            paddingBottom: '5rem'
        }}>
            <h3 className='py-5'>Kết quả tìm kiếm cho `{valueSearch}`</h3>
            {
                isLoading ? <Loading /> :
                    <div className='row justify-content-center'>
                        {
                            product.length > 0 ?
                                <div className='d-flex flex-wrap'>
                                    {
                                        product.map(item => (
                                            <CardProduct product={item} />
                                        ))
                                    }




                                </div>
                                :
                                <h3 className='text-center'>Không có sản phẩm cần tìm</h3>
                        }

                    </div>
            }

        </div>
    )
}

export default SearchPage
