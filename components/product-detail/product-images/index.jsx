import React, { useState } from 'react';
import styles from './styles.module.scss';

const ProductImages = ({ images, activeImage }) => {

    const [active, setActive] = useState(0);

    return (
        <div className={styles.swiper}>
            <div className={styles.swiper__active}>
                <img src={images[active].url} alt={images[active].url} />
            </div>
            <div className={styles.swiper__list}>
                { images.map((img, index) => (
                        <div 
                            key={index}
                            className={`${styles.swiper__list__item} ${index === active && styles.active}`}
                            onMouseOver={() => {
                                setActive(index)
                            }}
                        >
                            <img src={img.url} alt={img.url} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductImages;