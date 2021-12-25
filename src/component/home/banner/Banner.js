import React from 'react'
import SwipperCore, { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { dataImg } from '../../../assets/img/imgData';
import imgBanner from '../../../assets/img/3d-black-friday-sale-promotion-poster-banner-design-transparent-psd-file.jpg'
const Banner = () => {
    SwipperCore.use([Pagination, Autoplay])

    return (
        <div className='banner-container' style={{
            padding: '0 5rem'
        }}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='banner d-flex justify-content-center'>
                            <div className='banner_slide'>
                                <Swiper

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
                                // onSwiper={(swiper) => console.log(swiper)}
                                // onSlideChange={() => console.log("slide change")}

                                // onSlideChange={() => console.log('slide change')}
                                // onSwiper={(swiper) => console.log(swiper)}
                                >
                                    <SwiperSlide>

                                        <img src={'https://salt.tikicdn.com/cache/w1080/ts/banner/dd/fe/78/3923453af0e0481a9fbe2781aa6fccc8.png'}
                                            alt='' />
                                    </SwiperSlide>
                                    <SwiperSlide>

                                        <img src={'https://salt.tikicdn.com/cache/w1080/ts/banner/83/f2/c9/5f64cb4b60bf684f2b7d055950e91415.png'}
                                            alt='' />
                                    </SwiperSlide>
                                    <SwiperSlide>

                                        <img src={'https://salt.tikicdn.com/cache/w1080/ts/banner/d3/8f/6f/695a32d2f71ea6ba10f16905fdb5b5d4.png'}
                                            alt='' />
                                    </SwiperSlide>


                                </Swiper>

                            </div>


                        </div>
                    </div>
                    <div className='col-md-4'>
                        <img src='https://salt.tikicdn.com/cache/w400/ts/banner/9a/ea/aa/f7c0ef58c22a8ab06195bdbd508390b7.png' alt='' style={{
                            width: '408px',
                            height: '274px'
                        }} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Banner
