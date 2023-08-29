import { createRouter } from 'next-connect';
import db from '../../../utils/database';
import User from '../../../models/UserModel';
import Cart from '../../../models/CartModel';
import Product from '../../../models/ProductModel';
import auth from '../../../middleware/auth';

export const config = {
    api: {
        externalResolver: true,
    },
}

const router = createRouter().use(auth);

router.post(async(req, res) => {
    try {
        await db.connectDB();
        const { cart } = req.body;
        
        let products = [];
        let user = await User.findById(req.user);
        let existing_cart = await Cart.findOne({ user: user._id });

        if(existing_cart) {
            await existing_cart.remove();
        }

        for(let i = 0; i < cart.length; i++) {
            let dbProduct = await Product.findById(cart[i]._id).lean();
            let subProducts = dbProduct.subProducts[cart[i].style];
            let tempProduct = {};
            tempProduct.name = dbProduct.name;
            tempProduct.product = dbProduct._id;
            tempProduct.color = {
                color: cart[i].color.color,
                image: cart[i].color.image,
            };
            tempProduct.image = subProducts.images[0].url;
            tempProduct.qty = Number(cart[i].qty);
            tempProduct.size = cart[i].size;

            let price = Number(subProducts.sizes.find((item) => item.size === cart[i].size).price);
            tempProduct.price = subProducts.discount > 0 
                ? (price * ((100 - Number(subProducts.discount)) / 100)).toFixed(2) 
                : price.toFixed(2);

            products.push(tempProduct);
        }

        let cartTotalPrice = 0;
        for(let i = 0; i < products.length ; i++) {
            cartTotalPrice = cartTotalPrice + products[i].price * products[i].qty;
        }

        await new Cart({
            products,
            cartTotalPrice: cartTotalPrice,
            user: user._id,
        }).save();
        
        await db.disconnectDB();
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});