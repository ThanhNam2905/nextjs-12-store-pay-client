import { createRouter } from 'next-connect';
import db from '../../../../utils/database';
import auth from '../../../../middleware/auth';
import Order from '../../../../models/OrderModel';
import User from '../../../../models/UserModel';

export const config = {
    api: {
      externalResolver: true,
    },
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = createRouter().use(auth);

router.post(async(req, res) => {
    try {
        await db.connectDB();
        const { amount, id } = req.body;
        const order_id = req.query.id;
        const user = await User.findById(req.user);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: "usd",
            description: "Store Pay",
            payment_method: id,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never"
            },
            confirm: true,
        });
       
        console.log("paymentIntent ===> ", paymentIntent);

        const order = await Order.findById(order_id);
        if(order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: paymentIntent.id,
                status: paymentIntent.status,
                email_address: user.email,
            };

            await order.save();
            await db.disconnectDB();
            return res.status(200).json({
                success: true,
            });
        }
        else {
            await db.disconnectDB();
            return res.status(404).json({ message: "Order not found!"});
        }
    } catch (error) {
        await db.disconnectDB();
        console.log("error ===> ", error);
        return res.status(500).json({ message: error.message }); 
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});