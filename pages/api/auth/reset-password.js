
import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import User from '../../../models/UserModel';
import bcrypt from 'bcrypt';

const router = createRouter();

router.put(async (req, res) => {
    try {
        await db.connectDB();
        const { user_id, password } = req.body;

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({ message: "Địa chỉ email của bạn không tồn tại!"});
        }

        const cryptedPassword = await bcrypt.hash(password, 12);
        await user.updateOne({
            password: cryptedPassword,
        });
        
        await db.disconnectDB();
        res.json({
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});