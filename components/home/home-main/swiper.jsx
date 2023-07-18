import React, { useRef } from 'react'
import styles from './styles.module.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const HomeMainSwiper = () => {

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="mainSwiper"
            >
                {
                    [...Array(10).keys()].map((index) => (
                        <SwiperSlide key={index}>
                            <img 
                                src={`./../../../images/swiper/${index + 1}.jpg`} 
                                alt={`${index + 1}.jpg`} 
                            />
                        </SwiperSlide>
                    ))
                }
                
                
            </Swiper>
        </>
    )
}

export default HomeMainSwiper