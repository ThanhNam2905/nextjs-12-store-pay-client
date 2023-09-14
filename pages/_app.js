
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import store from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Head from 'next/head';
import React from 'react';
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <PayPalScriptProvider 
                            options={{ 
                                components: "buttons", 
                                currency: "USD" 
                            }}
                            deferLoading={true}
                        >
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="colored"
                            />
                                <Component {...pageProps} />
                            </PayPalScriptProvider>
                    </PersistGate>
                </Provider>
            </SessionProvider>
        </React.Fragment>
    );
}

export default MyApp
