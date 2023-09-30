import { createRouter } from 'next-connect';
import auth from '../../../middleware/auth';
import admin from '../../../middleware/admin';
import db from '../../../utils/database';
import Coupon from '../../../models/CouponModel';

const router = createRouter().use(auth).use(admin);

router.post(async(req, res) => {
    try {
        await db.connectDB();
        const { coupon, discount, startDate, endDate, quantity } = req.body;

        const checkCoupon = await Coupon.findOne({ coupon });
        if(checkCoupon) {
            return res.status(400).json({ message: `Mã coupon ${coupon} này đã tồn tại. Vui lòng thử với tên khác.`})
        }
        await new Coupon({ 
            coupon, 
            discount, 
            startDate, 
            endDate,
            quantity,
        }).save();
        await db.disconnectDB();
        return res.status(200).json({
            message: `Mã coupon ${coupon} được tạo thành công!`,
            coupons: await Coupon.find({}).sort({ updatedAt: -1}),
        });
    } catch (error) {
        await db.disconnectDB();
        return res.status(500).json({ message: error.message });
    }
});

router.delete(async(req, res) => {
    try {
        await db.connectDB();
        const { id, coupon } = req.body;
        await Coupon.findByIdAndRemove(id);
        await db.disconnectDB();
        return res.status(200).json({
            message: `Danh mục ${coupon} được xóa thành công!`,
            coupons: await Coupon.find({}).sort({ createdAt: -1}),
        })
    } catch (error) {
        await db.disconnectDB();
        return res.status(500).json({ message: error.message });
    }
});

router.put(async(req, res) => {
    try {
        await db.connectDB();
        const { id, 
            coupon,
            discount,
            quantity,
            startDate,
            endDate, 
        } = req.body;
        await Coupon.findByIdAndUpdate(id, { 
            coupon, 
            discount,
            quantity,
            startDate,
            endDate, 
            updatedAt: Date.now(),
        });
        await db.disconnectDB();
        return res.status(200).json({
            message: "Coupon đã được chỉnh sửa thành công",
            coupons: await Coupon.find({}).sort({ createdAt: -1}),
        })
    } catch (error) {
        await db.disconnectDB();
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});