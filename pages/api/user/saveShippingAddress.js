import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import User from '../../../models/UserModel';
import auth from '../../../middleware/auth';

const router = createRouter().use(auth);

router.post(async(req, res) => {
    try {
        await db.connectDB();
       
        const { address } = req.body;
        const filter = { _id: req.user };
        const user = await User.findOneAndUpdate(filter, {
            $push: {
                address: address,
            },
        }, { new: true });

        await db.disconnectDB();
        return res.status(200).json({ addresses: user.address });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});