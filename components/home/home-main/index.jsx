import React from 'react';
import styles from './styles.module.scss';
import HomeMainSwiper from './swiper';
import HomeMainOffers from './offers';
import HomeMainMenu from './menu';
import HomeMainUser from './user';
import HomeMainHeader from './header';

const HomeMain = () => {
    return (
        <section className={styles.main}>
            <article className={styles.header}>
                <HomeMainHeader/>
            </article>
            <article className={styles.menu}>
                <HomeMainMenu/>
            </article>
            <article className={styles.swiper}>
                <HomeMainSwiper/>
            </article>
            <article className={styles.offers}>
                <HomeMainOffers/>
            </article>
            <article className={styles.user}>
                <HomeMainUser/>
            </article>
        </section>
    )
}

export default HomeMain;