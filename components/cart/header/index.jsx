import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <div className={styles.header__left}>
                    <Link href={"/"}>
                        <img src="./../../../images/logo.png" alt="" />
                    </Link>
                </div>
                <div className={styles.header__right}>
                    <Link href={"/browser"}>
                        Tiếp tục mua sắm
                        <HiArrowNarrowRight/>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
