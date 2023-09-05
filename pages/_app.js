
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import store from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Head from 'next/head';
import React from 'react';
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

let persistor = persistStore(store);

function MyApp({ 
    Component, 
    pageProps: { session, ...pageProps } 
}) {
    return (
        <React.Fragment>
            <Head>
                <title>Store Pay</title>
                <meta name="description" content="Store Pay Online Ecommerce" />
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/2331/2331966.png" />
            </Head>
            <SessionProvider session={session}>
                <PayPalScriptProvider options={{ components: "buttons", currency: "USD" }}>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <Component {...pageProps} />
                        </PersistGate>
                    </Provider>
                </PayPalScriptProvider>
            </SessionProvider>
        </React.Fragment>
    );
}

export default MyApp
