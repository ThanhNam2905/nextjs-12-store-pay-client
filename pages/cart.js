import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import styles from './../styles/cart.module.scss';

const cart = () => {
    return (
        <>
            <Header country="Viet Nam"/>
            <main>
                <div className={styles.cart}>
                    Cart Page
                </div>
            </main>
            <Footer country="Viet Nam"/>
        </>
    )
}

export default cart