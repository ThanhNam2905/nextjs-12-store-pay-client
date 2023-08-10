import Footer from '../components/footer'
import styles from './../styles/cart.module.scss';
import CartHeader from '../components/cart/header';
import CartEmpty from '../components/cart/cart-empty';
import { useSelector } from 'react-redux';
import { Product } from '../components/cart/product';

const CartPage = () => {

    const { cart } = useSelector((state) => ({...state}));

    return (
        <>
            <CartHeader/>
            <main>
                <div className={styles.cart}>
                    {
                        cart.cartItems.length > 1 ? (
                            <div className={styles.cart__container}>
                                <div className={styles.cart__products}>
                                    {
                                        cart.cartItems.map((product) => (
                                            <Product
                                                key={product._uid}
                                                product={product}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        ) : (
                            <CartEmpty/>
                        )
                    }
                </div>
            </main>
            <Footer country="Viet Nam"/>
        </>
    )
}

export default CartPage;