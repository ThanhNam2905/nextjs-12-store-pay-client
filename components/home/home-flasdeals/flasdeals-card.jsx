import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { IoMdFlash } from 'react-icons/io';

const FlasDealsCard = ({ product }) => {
    return (
        <div className={styles.flasCard}>
            <div className={styles.flasCard__img}>
                <div className={styles.block}></div>
                <Link href={product.link}>
                    <img src={product.image} alt={product.image} />
                </Link>
                <div className={styles.discount}>
                    <span>{product.discount} %</span>
                </div>
            </div>
            <div className={styles.flasCard__price}>
                <span>{product.price} $</span>
                <span>{product.price * ((100 - product.discount) / 100)} $</span>
            </div>
            <div className={styles.flasCard__bar}>
                <div className={styles.flasCard__bar__inner} style={{ width: "75%"}}></div>
            </div>
            <div className={styles.flasCard__percentage}>
                {product.sold} đã bán
            </div>
        </div>
    )
}

export default FlasDealsCard;