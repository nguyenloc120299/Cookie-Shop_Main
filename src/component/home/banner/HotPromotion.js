import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../GlobalContext'
import { Swiper, SwiperSlide } from "swiper/react";
import SwipperCore, { Autoplay, Navigation } from 'swiper'
import CardProduct from '../CardProduct';
const HotPromotion = () => {
    const context = useContext(GlobalContext)
    const [products] = context.productsApi.products
    const [products1, setProducts1] = useState([])
    const getProducts = () => {
        products.forEach(element => {
            if (element.promotion > 20) setProducts1(products1 => [...products1, element])
        });
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div className='hot_products'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <div className='sale_flash'></div>
                        {/* <Swiper Swiper
                            slidesPerView={5}
                            slidesPerGroup={5}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                "clickable": true
                            }}
                            navigation={true} className="mySwiper1"
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}
                        > */}
                        <div className='d-flex justify-content-aroound'>
                            {
                                products && products1.slice(0, 6).map((item, index) => (

                                    <CardProduct product={item} isShowBtn={true} key={index} />

                                ))
                            }
                        </div>

                        {/* </Swiper> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HotPromotion
