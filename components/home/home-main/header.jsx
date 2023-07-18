import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';

const HomeMainHeader = () => {
    return (
        <ul className={styles.header__list}>
            <li>
                <Link href={""}>
                    Stores
                </Link>
            </li>
            <li>
                <Link href={""}>
                    Clothings
                </Link>
            </li>
            <li>
                <Link href={""}>
                    Shoes
                </Link>
            </li>
            <li>
                <Link href={""}>
                    Electrolics
                </Link>
            </li>
        </ul>
    )
}

export default HomeMainHeader;