import styles from './styles.module.scss'

const CartCheckout = ({ subTotal, total, shippingPrice, selected}) => {
    return (
        <div className={`${styles.cart__checkout} ${styles.card}`}>
            <h2>đơn hàng của bạn</h2>
            <div className={styles.cart__checkout__line}>
                <span>Tạm tính:</span>
                <span>{subTotal}</span>
            </div>
            <div className={styles.cart__checkout__line}>
                <span>Phí vận chuyễn:</span>
                <span>{shippingPrice}</span>
            </div>
            <div className={styles.cart__checkout__total}>
                <span>Tổng tiền:</span>
                <span>{total}</span>
            </div>
            <div className={styles.submit}>
                <button>Tiếp tục</button>
            </div>
        </div>
    )
}

export default CartCheckout;