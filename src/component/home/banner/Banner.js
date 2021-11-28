import React from 'react'
import SwipperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { dataImg } from '../../../assets/img/imgData';
const Banner = () => {
    SwipperCore.use([Pagination, Autoplay])

    return (
        <div className='banner d-flex justify-content-between'>
            <div className='banner_slide'>
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        "clickable": true
                    }}
                    className="mySwiper"
                    slidesPerView={1}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                    loop={true}

                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>

                        <img src={dataImg.imgbaner1}
                            alt='' />
                    </SwiperSlide>
                    <SwiperSlide>

                        <img src={dataImg.imgbaner2}
                            alt='' />
                    </SwiperSlide>
                    <SwiperSlide>

                        <img src={dataImg.imgbaner3}
                            alt='' />
                    </SwiperSlide>


                </Swiper>

            </div>

        </div>
    )
}

export default Banner
