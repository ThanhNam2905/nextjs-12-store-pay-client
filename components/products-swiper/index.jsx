import styles from './styles.module.scss';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';

const ProductsSwiper = ({ header, products, backgroundColor }) => {
    return (
        <section className={styles.products__wrapper}>
            { header && (
                <div className={styles.products__header} style={{ background: `${backgroundColor}`}}>
                    {header}
                </div>
            )}
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
                className="products_swiper"
            >
                { products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.product}>
                            <div className={styles.product__img}>
                                <img src={product.image} alt="" />
                            </div>
                            <div className={styles.product__info}>
                                { product.name.length && (
                                    <p className={styles.line__clamp__2}>{product.name}</p>
                                )}
                                { product.price && (
                                    <span>{product.price} $</span>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                    ))
                }  
            </Swiper>
        </section>
    )
}

export default ProductsSwiper;