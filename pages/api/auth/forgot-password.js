
import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import { sendEmail } from '../../../utils/sendEmails';
import User from '../../../models/UserModel';
import { createResetToken } from '../../../utils/tokens';
import { resetPasswordEmailTemplate } from '../../../emails/resetPasswordEmailTemplate';

const router = createRouter();

router.post(async (req, res) => {
    try {
        await db.connectDB();
        const { email } = req.body;

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Địa chỉ email của bạn không tồn tại!"});
        }

        // Verified email of user.
        const user_id = createResetToken({
            id: user._id.toString(),
        })

        const url = `${process.env.BASE_URL}/auth/reset-password/${user_id}`;
        sendEmail(email, url, "", "Đặt lại mật khẩu của bạn", resetPasswordEmailTemplate);
        await db.disconnectDB();
        res.json({
            message: "Thành công! Nếu địa chỉ Email bạn cung cấp tồn tại thì vui lòng truy cập email của bạn để đặt lại mật khẩu",
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});