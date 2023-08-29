import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import User from '../../../models/UserModel';
import auth from '../../../middleware/auth';

const router = createRouter().use(auth);

router.put(async (req, res) => {    
    try {
        await db.connectDB();

        const { id } = req.body;
        let user = await User.findById(req.user);
        let user_addresses = user.address;
        let addresses = [];
        for (let i = 0; i < user_addresses.length; i++) {
            let temp_address = {};
            
            if (user_addresses[i]._id == id) {
                temp_address = { ...user_addresses[i].toObject(), active: true };
                addresses.push(temp_address);
            } else {
                temp_address = { ...user_addresses[i].toObject(), active: false };
                addresses.push(temp_address);
            }
        }
        await user.updateOne(
            {
                address: addresses,
            },
            { new: true }
        );

        await db.disconnectDB();
        return res.status(200).json({ addresses });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete(async (req, res) => {  
    try {
        await db.connectDB();
        const { id } = req.body;
        const filter = { _id: req.user };
        const user = await User.findOneAndUpdate(filter, {
            $pull: { address: { _id: id }}
        }, { new: true });

        await db.disconnectDB();
        return res.status(200).json({ addresses: user.address.filter((item) => item._id !== id) });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});

