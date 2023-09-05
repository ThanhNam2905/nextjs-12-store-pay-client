import { loadStripe } from '@stripe/stripe-js';
import styles from './styles.module.scss';
import { Elements } from '@stripe/react-stripe-js';
import Form from './form';

export default function StripePayment({ totalPrice, order_id, stripe_publish_key }) {

    const stripePromise = loadStripe(stripe_publish_key);

    return (
        <Elements stripe={stripePromise}>
            <Form
                totalPrice={totalPrice}
                order_id={order_id}
            />
        </Elements>
    )
}
