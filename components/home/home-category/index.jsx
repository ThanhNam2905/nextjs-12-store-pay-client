import React from 'react';
import styles from './styles.module.scss';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useMediaQuery } from 'react-responsive';

const HomeCategory = ({ header, products, backgroundColor }) => {

    const isTabletMedia = useMediaQuery({ query: "(max-width:1300px)" });
    const isMobileMedia = useMediaQuery({ query: "(max-width:640px)" });

    return (
        <div className={styles.category__container} style={{ backgroundColor: `${backgroundColor}`}}>
            <div className={styles.category__header}>
                <h2>{header}</h2>
                <BsFillArrowRightCircleFill/>
            </div>
            <div className={styles.category__products}>
                {
                    products.slice(0, isMobileMedia ? 6 : isTabletMedia ? 4 : 6).map((product, index) => (
                        <div className={styles.img} key={index}>
                            <img src={product.image} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HomeCategory;