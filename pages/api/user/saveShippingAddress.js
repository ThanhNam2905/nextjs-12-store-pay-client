import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import User from '../../../models/UserModel';

const router = createRouter();

router.post(async(req, res) => {
    try {
        await db.connectDB();
       
        const { address, user_id } = req.body;
        const user = await User.findById(user_id);
        await user.updateOne({
            $push: {
                address: address,
            }
        })
        await db.disconnectDB();
        return res.json(address);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});