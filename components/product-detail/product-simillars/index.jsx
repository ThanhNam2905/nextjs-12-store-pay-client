import React from 'react';
import { simillar_products } from '../../../data/products';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

import styles from './styles.module.scss';
import Link from 'next/link';

const ProductSimillars = () => {
    return (
        <div className={styles.simillars__wrapper}>
            <h3>Sản phẩm tương tự dành cho bạn</h3>
            <div className={styles.simillars__swiper}>
                <Swiper
                    slidesPerGroup={4}
                    className='smimillar_swiper'
                    navigation={true}
                    modules={[Navigation]}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 8,
                        },
                        670: {
                            slidesPerView: 3,
                            spaceBetween: 12,
                        },
                        991: {
                            slidesPerView: 4,
                            spaceBetween: 18,
                        },
                        1240: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        }
                    }}
                >
                    { simillar_products.map((product, index) => (
                        <SwiperSlide key={index}>
                            <Link href={""}>
                                <img src={product} alt={product} />
                            </Link>
                        </SwiperSlide>
                    ))
                        
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ProductSimillars;