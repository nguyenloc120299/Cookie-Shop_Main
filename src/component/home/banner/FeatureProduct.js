import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwipperCore, { Autoplay, Navigation } from 'swiper'
import { GlobalContext } from '../../../GlobalContext';
import CardProduct from '../CardProduct';
const FeatureProduct = () => {
    SwipperCore.use([Autoplay, Navigation])
    const context = useContext(GlobalContext)

    const [products] = context.productsApi.products
    const featureProduct = products.filter(item => {
        return item.featured === 1
    })

    return (
        <div className='feture_products'>
            <h3>Sản phẩm nổi bật <img src='https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg' alt='' className='img_feture' /></h3>
            {
                featureProduct.length > 0 ?
                    <Swiper Swiper
                        slidesPerView={5}
                        spaceBetween={30}
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
