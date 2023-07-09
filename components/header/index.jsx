import React from 'react';
import TopHeader from './top-header';
import styles from './styles.module.scss';
import MainHeader from './main-header';

const Header = ({ country }) => {
    return (
        <header className={styles.header}>
            <TopHeader country={country}/>
            <MainHeader/>
        </header>
    )
}

export default Header