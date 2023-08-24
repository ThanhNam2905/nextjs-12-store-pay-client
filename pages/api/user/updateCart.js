import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import User from '../../../models/UserModel';
import Cart from '../../../models/CartModel';
import Product from '../../../models/ProductModel';

const router = createRouter();

router.post(async(req, res) => {
    try {
        await db.connectDB();
        const promises = req.body.products.map(async(item) => {
            let dbProduct = await Product.findById(item._id).lean();
            let originalPrice = dbProduct.subProducts[item.style].sizes.find((x) => x.size === item.size).price;
            let quantity = dbProduct.subProducts[item.style].sizes.find((x) => x.size === item.size).qty;
            let discount = dbProduct.subProducts[item.style].discount;

            return {
                ...item,
                priceBefore: originalPrice,
                price: discount > 0 
                    ? (originalPrice * ((100 - Number(discount)) / 100)).toFixed(2) 
                    : originalPrice.toFixed(2),
                discount: discount,
                quantity: quantity,
                shippingPrice: dbProduct.shipping,
            }
        });

        const data = await Promise.all(promises);
        await db.disconnectDB();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});