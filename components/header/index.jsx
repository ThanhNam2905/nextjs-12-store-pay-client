import React from 'react';
import TopHeader from './top-header';
import styles from './styles.module.scss';
import MainHeader from './main-header';

const Header = () => {
    return (
        <header className={styles.header}>
            <TopHeader/>
            <MainHeader/>
        </header>
    )
}

export default Header