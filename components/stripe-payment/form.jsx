import { useState } from 'react';
import styles from './styles.module.scss'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#16a085",
            color: "#111",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#333" },
            "::placeholder": { color: "#333"},
        },
        invalid: {
            iconColor: "#e74c3c",
            color: "#e74c3c",
        }
    }
};

export default function Form ({ totalPrice, order_id }) {
    const [errorStripe, setErrorStripe] = useState("");
    const stripe = useStripe();
    const elements = useElements();

    const handlerSubmit = async(event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        console.log("error ==>", error);
        if(!error) {
            try {
                const { id } = paymentMethod;
                // console.log("id ==>", id);
                // console.log("order_id ==>", order_id);
                const res = await axios.post(`/api/order/${order_id}/payWithStripe`, {
                    amount: totalPrice,
                    id,
                });

                console.log("res ==> ", res);
    
                if(res.data.success) {
                    window.location.reload(false);
                }
            } catch (error) {
                setErrorStripe(error);
            }
        }
        else {
            setErrorStripe(error.message);
        }
    };

    return (
        <div className={styles.stripe}>
            <form onSubmit={handlerSubmit}>
                <CardElement options={CARD_OPTIONS}/>
                <button type="submit">Thanh toán</button>
                { errorStripe && <span className={styles.error__msg}>{errorStripe}</span> }
            </form>
        </div>
    )
}
