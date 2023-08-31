import styles from './styles.module.scss';
import { RiShoppingBasketLine } from "react-icons/ri";

export const Products = ({ cart }) => {

    return (
        <div className={styles.products}>
            <div className={styles.products__header}>
                <h2>
                    <RiShoppingBasketLine/>
                    Giỏ hàng của bạn
                </h2>
                <span>
                    {cart.products.length === 1 ?  ("1 sản phẩm") : `${cart.products.length} sản phẩm` }
                </span>
            </div>
            <div className={styles.products__wrapper}>
                { cart.products.map((product, index) => (
                        <div 
                            className={styles.product}
                            key={index}
                        >
                            <div className={styles.product__thumbnail}>
                                <img src={product.image} alt="" />
                            </div>
                            
                            <div className={styles.product__details}>
                                <div className={styles.detail__specifications}>
                                    <img src={product.color.image} alt="" />
                                    <div>
                                        <p>Kích thước: <span>{product.size}</span></p>
                                        <p>Số lượng: <span>{product.qty}</span></p>
                                    </div>
                                </div>
                                <div className={styles.product__name} title={product.name}>
                                    <span>
                                        {product.name.length > 26 ? `${product.name.substring(0, 26)}...` : product.name}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.product__price}>
                                <span>{(product.price * product.qty).toFixed(2)} đ</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={styles.products__subTotal}>
                    <span>Tổng tiền:</span>
                    {cart.cartTotalPrice.toFixed(2)} đ
                </div>
        </div>
    )
}
