import Footer from '../components/footer'
import styles from './../styles/cart.module.scss';
import Header from '../components/cart/header';
import CartEmpty from '../components/cart/cart-empty';
import { useDispatch, useSelector } from 'react-redux';
import { CartProduct } from '../components/cart/cart-product';
import CartHeader from '../components/cart/cart-header';
import CartCheckout from '../components/cart/cart-checkout';
import { useEffect, useState } from 'react';
import CartPaymentMethods from '../components/cart/cart-paymentMethods';
import ProductsSwiper from '../components/products-swiper';
import { women_swiper } from '../data/home';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { saveCart } from '../requests/user';
import axios from 'axios';
import { updateCart } from '../store/cartSlice';

const CartPage = () => {

    const { cart } = useSelector((state) => ({...state}));
    const dispatch = useDispatch();
    const [selectedItems, setSelectedItems] = useState([]);

    const [shippingPrice, setShippingPrice] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const update = async() => {
            const { data } = await axios.post("/api/user/updateCart", {
                products: cart.cartItems,
            });
            dispatch(updateCart(data));
        }
        if(cart.cartItems.length > 0) {
            update();
        }
    }, []);

    useEffect(() => {
        setShippingPrice(selectedItems.reduce((a,c) => a + c.shipping, 0).toFixed(2));
        setSubTotal(selectedItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2));
        setTotal(selectedItems.reduce((a, c) => a + c.price * c.qty + c.shipping, 0).toFixed(2));
    }, [selectedItems, shippingPrice]);

    const { data: session } = useSession();
    const Router = useRouter();

    // Handle save Items Cart To Database.
    const saveCartToDatabaseHandle = async() => {
        if(session) {
            const res = await saveCart(selectedItems);
            Router.push("/checkout")
        }
        else {
            signIn();
        }
    };

    return (
        <>
            <Header/>
            <main>
                <div className={styles.cart}>
                    {
                        cart.cartItems.length > 0 ? (
                            <>
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
                                        subTotal={subTotal} 
                                        total={total} 
                                        shippingPrice={shippingPrice} 
                                        selectedItems={selectedItems}
                                        saveCartToDatabaseHandle={saveCartToDatabaseHandle}
                                    />
                                    <CartPaymentMethods/>
                                </div>
                                {/* <ProductsSwiper 
                                    products={women_swiper} 
                                    header="Danh sách gợi ý"
                                /> */}
                            </>
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