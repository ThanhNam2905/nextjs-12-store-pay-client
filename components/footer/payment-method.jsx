import React from 'react'
import styles from './styles.module.scss';

const PaymentMethod = () => {
  return (
    <div className={styles.footer__payment}>
        <h3>We accpet</h3>
        <div className={styles.flexWrapper}>
            <img src="./../../images/payment/mastercard.webp" alt="Payment mastercard" />
            <img src="./../../images/payment/visa.webp" alt="Payment visa" />
            <img src="./../../images/payment/paypal.webp" alt="Payment paypal" />
            <img src="./../../images/payment/jcb.webp" alt="Payment jcb" />
            <img src="./../../images/payment/american_express.webp" alt="Payment american_express" />
        </div>
    </div>
  )
}

export default PaymentMethod