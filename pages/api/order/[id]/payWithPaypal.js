import { createRouter } from 'next-connect';
import db from '../../../../utils/database';
import auth from '../../../../middleware/auth';
import Order from '../../../../models/OrderModel';

export const config = {
    api: {
      externalResolver: true,
    },
}

const router = createRouter().use(auth);

router.put(async(req, res) => {
    await db.connectDB();

    const order = await Order.findById(req.body.order_id);
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.email_address,
        };
        const newOrder = await order.save();
        await db.disconnectDB();
        return res.status(200).json({
            message: "Order is paid", 
            order: newOrder,
        });
    }
    else {
        await db.disconnectDB();
        return res.status(404).json({
            message: "Order is not found",
        })
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});