import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay } from 'swiper/modules';

const ProductSwiper = ({ images }) => {

    const swiperRef = useRef(null);

    useEffect(() => {
        swiperRef.current.swiper.autoplay.stop();
    }, [swiperRef]);

    return (
        <div 
            className={styles.swiper__container}
            onMouseEnter={() => {
                swiperRef.current.swiper.autoplay.start();
            }}
            onMouseLeave={() => {
                swiperRef.current.swiper.autoplay.stop();
                swiperRef.current.swiper.slideTo(0);
            }}
        >
            <Swiper
                ref={swiperRef}
                centeredSlides={true}
                autoplay={{
                    delay: 700, 
                    stopOnLastSlide: false,
                }}
                speed={700}
                modules={[ Autoplay ]}
            >
                {
                    images.map((img) => (
                        <SwiperSlide key={img.public_url}>
                            <img src={img.url} alt={img.url} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default ProductSwiper