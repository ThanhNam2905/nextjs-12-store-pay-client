import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import styles from './styles.module.scss';
import { IoMdFlash } from 'react-icons/io';
import CountDown from '../../countdown';
import { flashDealsArray } from '../../../data/home';
import FlasDealsCard from './flasdeals-card';


const HomeFlasDeals = () => {
    return (
        <div className={styles.flasDeals}>
            <div className={styles.flasDeals__header}>
                <h2>
                    Flas Deals
                    <IoMdFlash/>
                </h2>
                <CountDown date={new Date(2023, 6, 22)}/>
            </div>
            <div className={styles.flasDeals__swiper}>
                <Swiper
                    slidesPerView={1}

                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                        550: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        750: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        991: {
                            slidesPerView: 4,
                            spaceBetween: 15,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 15,
                        },
                        1780: {
                            slidesPerView: 6,
                            spaceBetween: 15,
                        },
                    }}
                    className="flasDeals__Swiper"
                >
                    <div className={styles.flasDeals__list}>
                        {
                            flashDealsArray.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <FlasDealsCard product={product}/>
                                </SwiperSlide>
                            ))
                        }
                    </div>
                    
                </Swiper>
            </div>
        </div>
    )
}

export default HomeFlasDeals