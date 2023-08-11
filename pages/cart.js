import Footer from '../components/footer'
import styles from './../styles/cart.module.scss';
import Header from '../components/cart/header';
import CartEmpty from '../components/cart/cart-empty';
import { useDispatch, useSelector } from 'react-redux';
import { CartProduct } from '../components/cart/cart-product';
import CartHeader from '../components/cart/cart-header';
import CartCheckout from '../components/cart/cart-checkout';
import { updateCart } from '../store/cartSlice';
import { useEffect, useState } from 'react';

const CartPage = () => {

    const { cart } = useSelector((state) => ({...state}));
    const dispatch = useDispatch();
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        // dispatch(updateCart([]));
    }, []);

    console.log("selectedItems ==> ", selectedItems);

    return (
        <>
            <Header/>
            <main>
                <div className={styles.cart}>
                    {
                        cart.cartItems.length > 0 ? (
                            <div className={styles.cart__container}>
                                <CartHeader 
                                    cartItems={cart.cartItems}
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}    
                                />
                                <div className={styles.cart__products}>
                                    {
                                        cart.cartItems.map((product) => (
                                            <CartProduct
                                                key={product._uid}
                                                product={product}
                                                selectedItems={selectedItems}
                                                setSelectedItems={setSelectedItems}
                                            />
                                        ))
                                    }
                                </div>
                                <CartCheckout 
                                    subTotal={5458} 
                                    total={5458} 
                                    shippingPrice={0} 
                                    selected={[]}
                                />
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