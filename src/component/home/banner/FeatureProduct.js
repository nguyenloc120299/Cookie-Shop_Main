import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwipperCore, { Autoplay, Navigation } from 'swiper'
import { GlobalContext } from '../../../GlobalContext';
import { apiInstance } from '../../../baseApi'
import CardProduct from '../CardProduct';
const FeatureProduct = () => {
    SwipperCore.use([Autoplay, Navigation])
    // const context = useContext(GlobalContext)
    const [featureProduct, setFeatureProduct] = useState([])
    // const [products] = context.productsApi.products
    useEffect(() => {
        const getFeature = async () => {
            const res = await apiInstance.get('/products')
            setFeatureProduct(res.data.filter(item => {
                return item.featured === 1
            })
            )
        }
        getFeature()
    }, [])
    return (
        <div className='feture_products container-fluid'>
            <h3 style={{
                color: 'rgb(255, 128, 29)',
                fontWeight: 'bold',
                fontStyle: 'italic',
                padding: '0 4rem'
            }}>Sản phẩm nổi bật <img src='https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg' alt='' className='img_feture'

                /></h3>
            {
                featureProduct.length > 0 ?
                    <Swiper Swiper
                        slidesPerView={5}
                        slidesPerGroup={5}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        pagination={{
                            "clickable": true
                        }}
                        navigation={true} className="mySwiper1"
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false
                        }}
                    >
                        {
                            featureProduct && featureProduct.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <CardProduct product={item} isShowBtn={true} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    :
                    <div className='d-flex justify-content-center align-items-center'>
                        <h3>Chưa có sản phẩm nổi bật</h3>
                    </div>
            }


        </div >
    )
}

export default FeatureProduct
