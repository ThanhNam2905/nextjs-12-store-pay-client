import styles from './styles.module.scss'

const CartCheckout = ({ subTotal, total, shippingPrice, selectedItems, saveCartToDatabaseHandle }) => {
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
                <button 
                    disabled={selectedItems.length === 0 ? "disabled" : ""}
                    style={{ 
                        backgroundColor: `${selectedItems.length === 0 ? "#999" : ""}`, 
                        cursor: `${selectedItems.length === 0 ? "not-allowed" : "pointer"}`,
                    }}
                    onClick={() => saveCartToDatabaseHandle()}
                >Tiếp tục thanh toán</button>
            </div>
        </div>
    )
}

export default CartCheckout;