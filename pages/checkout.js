import { getSession } from 'next-auth/react';
import styles from './../styles/checkout.module.scss'
import User from '../models/UserModel';
import Cart from '../models/CartModel';
import db from '../utils/database';
import Header from '../components/cart/header';
import Footer from '../components/footer';
import { ShippingAddress } from '../components/checkout/shipping-address';
import { useState } from 'react';
import axios from 'axios';

const CheckoutPage = ({ cart, user, locations }) => {

    const [selectedAddress, setSelectedAddress] = useState(user?.address[0]);

    return (
        <>
            <Header/>
            <main className={styles.checkout}>
                <div className={styles.container}>
                    <section className={styles.checkout__side}>
                        <ShippingAddress
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                            user={user}
                            locations={locations}
                        />
                    </section>
                    <section className={styles.checkout__side}>
                        
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
    const cart = await Cart.find({ user: user._id});
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