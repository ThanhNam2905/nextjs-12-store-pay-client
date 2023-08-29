import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import Coupon from '../../../models/CouponModel';

const router = createRouter();

router.post(async(req, res) => {
    try {
        await db.connectDB();
       
        const { coupon, startDate, endDate, discount } = req.body;
        const check = await Coupon.findOne({coupon});
        if(check) {
            return res.status(400).json({
                message: "Mã giảm giá này đã tồn tại, vui lòng thử lại với mã giảm giá khác!"
            })
        }

        await new Coupon({
            coupon, 
            startDate, 
            endDate, 
            discount
        }).save();

        await db.disconnectDB();
        return res.status(200).json({
            message: "Mã giảm giá được tạo thành công",
            coupons: await Coupon.find({}),
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