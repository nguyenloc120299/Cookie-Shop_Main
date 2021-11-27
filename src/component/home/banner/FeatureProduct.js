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
        return item.featured === 0
    })
    console.log(featureProduct);
    return (
        <div className='feture_products'>
            <h3>Sản phẩm nổi bật</h3>
            {
                <Swiper slidesPerView={5} spaceBetween={30} slidesPerGroup={5} loop={true} loopFillGroupWithBlank={true} pagination={{
                    "clickable": true
                }} navigation={true} className="mySwiper1">
                    {
                        featureProduct && featureProduct.map(item => (
                            <SwiperSlide key={item.id}>
                                <CardProduct product={item} isShowBtn={true} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }
        </div>
    )
}

export default FeatureProduct
