import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

const NewslleterForm = () => {
    return (
        <div className={styles.footer__newslleterForm}>
            <h3>Sign up for our Newslleter</h3>
            <div className={styles.form}>
                <input type="email" name="" id="" placeholder='Your Email Address Your' />
                <button className={styles.btn_primary}>
                    Subscribes
                </button>
            </div>
            <p>
                By clicking the <b>SUBSCRIBE</b> button, you are agreeing to{" "}
                <Link href={""}>    
                    Our Privacy & Cookie Policy
                </Link>
            </p>
        </div>
    )
}

export default NewslleterForm