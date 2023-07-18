import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';
import styles from './styles.module.scss';
import { offersArray } from '../../../data/home';

export default function HomeMainOffers() {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Navigation]}
                className="offers_swiper"
            >
                {
                    offersArray.map((offer, index) => (
                        <SwiperSlide key={index}>
                            <img src={offer.image} alt={offer.image} />
                            <span>{offer.price} $</span>
                            <span>{offer.discount}%</span>
                        </SwiperSlide>
                    ))
                }     
            </Swiper>
        </>
    );
}
