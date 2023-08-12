import styles from './styles.module.scss'

const CartPaymentMethods = () => {
    return (
        <div className={`${styles.cart__payment} ${styles.card}`}>
            <h2 className={styles.header}>Phương thức thanh toán:</h2>
            <div className={styles.images__payment}>
                <img src="./../../../images/payment/visa.webp" alt="" />
                <img src="./../../../images/payment/mastercard.webp" alt="" />
                <img src="./../../../images/payment/paypal.webp" alt="" />
            </div>
            <h2 className={styles.header}>Bảo vệ người mua</h2>
            <div className={styles.protection}>
                <img src="./../../../images/protection.png" alt="" />
                <p>Người mua sẽ được hoàn tiền đầy đủ nếu mặt hàng không như mô tả hoặc nếu nó không được giao</p>
            </div>
        </div>
    )
}

export default CartPaymentMethods