import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { BsSearch } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";

const MainHeader = () => {
    return (
        <div className={styles.mainHeader}>
            <div className={styles.mainHeader__container}>
                <Link href={"/"}  className={styles.logo}>
                    <img src="./../../images/logo.png" alt="logo website" />
                </Link>
                <div className={styles.search}>
                    <input type="text" name="" id="" placeholder='Search here...'/>
                    <div className={styles.search__icon}>
                        <BsSearch/>
                    </div>
                </div>
                <div className={styles.cart}>
                    <Link href={"/cart"} className={styles.cart__icon}>
                        <RiShoppingCartLine/>
                        <span>0</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainHeader