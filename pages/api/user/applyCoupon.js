import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import User from '../../../models/UserModel';
import auth from '../../../middleware/auth';
import Coupon from '../../../models/CouponModel';
import Cart from '../../../models/CartModel';

const router = createRouter().use(auth);

router.post(async(req, res) => {
    try {
        await db.connectDB();
        
        const { coupon } = req.body;
        const user = await User.findById(req.user);
        const checkCoupon = await Coupon.findOne({coupon});
        if(checkCoupon == null) {
            return res.json({ message: "Mã giảm giá này không tồn tại!"});
        }

        const { cartTotalPrice } = await Cart.findOne({ user: req.user });
        let totalAfterDiscount = cartTotalPrice - (cartTotalPrice * checkCoupon.discount) /100;
        await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount }, {new: true});

        await db.disconnectDB();
        return res.status(200).json({ 
            totalAfterDiscount: totalAfterDiscount.toFixed(2), 
            discount: checkCoupon.discount,
            success: "Mã giảm giá của bạn được áp dụng thành công.",
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