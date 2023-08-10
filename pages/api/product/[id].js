import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import Product from '../../../models/ProductModel';

const router = createRouter();

router.get(async(req, res) => {
    try {
        await db.connectDB();
        const { id } = req.query;
        const { style } = req.query;
        const { size } = req.query;

        const product = await Product.findById(id).lean();
        let discount = product.subProducts[style].discount;
        let priceBefore = product.subProducts[style].sizes[size].price;
        let price = discount > 0 ? (
            priceBefore * ((100 - discount) / 100)
        ) : (
            priceBefore
        );

        await db.disconnectDB();
        return res.json({
            _id: product._id,
            style: Number(style),
            size: product.subProducts[style].sizes[size].size,
            name: product.name,
            description: product.description,
            slug: product.slug,
            sku: product.subProducts[style].sku,
            brand: product.brand,
            shipping: product.shipping,
            images: product.subProducts[style].images,
            color: product.subProducts[style].color,
            price,
            priceBefore,
            quantity: product.subProducts[style].sizes[size].qty,
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});