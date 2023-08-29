import { getSession } from 'next-auth/react';
import styles from './../styles/checkout.module.scss'
import User from '../models/UserModel';
import Cart from '../models/CartModel';
import db from '../utils/database';
import Header from '../components/cart/header';
import Footer from '../components/footer';
import { ShippingAddress } from '../components/checkout/shipping-address';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Products } from '../components/checkout/products';
import { PaymenthMethods } from '../components/checkout/payment-methods';
import { Summary } from '../components/checkout/summary';

const CheckoutPage = ({ cart, user, locations }) => {
    
    const [addresses, setAddresses] = useState(user?.address || []);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");

    useEffect(() => {
        let check = addresses.find((address) => address.active === true);
        if(check) {
            setSelectedAddress(check);
        }
        else {
            setSelectedAddress("");
        }
    }, [addresses]);

    return (
        <>
            <Header/>
            <main className={styles.checkout}>
                <div className={styles.container}>
                    <section className={styles.checkout__side}>
                        <ShippingAddress
                            locations={locations}
                            user={user}
                            addresses={addresses}
                            setAddresses={setAddresses}
                        />
                        <Products
                            cart={cart}
                        />
                    </section>
                    <section className={styles.checkout__side}>
                        <PaymenthMethods
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />
                        <Summary
                            totalAfterDiscount={totalAfterDiscount}
                            setTotalAfterDiscount={setTotalAfterDiscount}
                            user={user}
                            cart={cart}
                            selectedAddress={selectedAddress}
                            paymentMethod={paymentMethod}
                        />
                    </section>
                </div>
            </main>
            <Footer country="Viet Nam"/>
        </>
    )
}

export default CheckoutPage;

export async function getServerSideProps(context) {
    await db.connectDB();
    const session = await getSession(context);
    const user = await User.findById(session.user.id);
    const cart = await Cart.findOne({ user: user._id});

    await db.disconnectDB();
    if(!cart) {
        return {
            redirect: {
                destination: "/cart",
            }
        }
    }

    let data = await axios.get('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
        .then((response) => {
            return response.data.data.data;
        })
        .catch((error) => {
            console.log("error", error);
        });

    return {
        props: {
            cart: JSON.parse(JSON.stringify(cart)),
            user: JSON.parse(JSON.stringify(user)),
            locations: JSON.parse(JSON.stringify(data)),
        }
    }
}