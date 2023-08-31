import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import auth from '../../../middleware/auth';
import User from '../../../models/UserModel';
import Order from '../../../models/OrderModel';


const router = createRouter().use(auth);

router.post(async(req, res) => {
    try {
        await db.connectDB();
       
        const { 
            products, 
            shippingAddress, 
            paymentMethod, 
            totalPrice,
            totalBeforeDiscount,
            couponApplied,
            discount,
        } = req.body;
        const user =await User.findById(req.user);
        const newOrder = await new Order({
            user: user._id,
            products,
            shippingAddress,
            paymentMethod,
            totalPrice,
            totalBeforeDiscount,
            couponApplied,
            discount,
        }).save();
        
        await db.disconnectDB();
        return res.status(200).json({
            order_id: newOrder._id,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});