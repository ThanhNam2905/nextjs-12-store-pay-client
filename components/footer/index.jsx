import React from 'react'
import QuickLinks from './quick-links'
import styles from './styles.module.scss';
import SocialsLink from './socials-link';
import NewslleterForm from './newslleter-form';
import Copyright from './copyright';
import PaymentMethod from './payment-method';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <QuickLinks/>
                <SocialsLink/>
                <PaymentMethod/>
                <NewslleterForm/>
                <Copyright/>
            </div>
        </footer>
    )
}

export default Footer