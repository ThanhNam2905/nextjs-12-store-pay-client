import { createRouter } from 'next-connect';
import auth from '../../../../middleware/auth';
import admin from '../../../../middleware/admin';
import db from '../../../../utils/database';
import Product from '../../../../models/ProductModel';
import slugify from 'slugify';


const router = createRouter().use(auth).use(admin);

router.post(async(req, res) => {
    try {
        db.connectDB();
        if(req.body.parent) {
            const parent = await Product.findById(req.body.parent);
            if(!parent) {
                return res.status(400).json({
                    message: "Không tìm thấy sản phẩm gốc!"
                });
            }
            else {
                const newParent = await parent.updateOne({
                    $push: {
                        subProducts: {
                            sku: req.body.sku,
                            color: req.body.color,
                            images: req.body.images,
                            sizes: req.body.sizes,
                            discount: req.body.discount,
                        },
                    },
                }, { new: true });
            }
        }
        else {
            req.body.slug = slugify(req.body.name);
            const newProduct = new Product({
                name: req.body.name,
                slug: req.body.slug,
                description: req.body.description,
                brand: req.body.brand,
                details: req.body.details,
                questions: req.body.questions,
                category: req.body.category,
                subCategories: req.body.subCategories,
                subProducts: {
                    sku: req.body.sku,
                    discount: req.body.discount,
                    images: req.body.images,
                    color: req.body.color,
                    sizes: req.body.sizes,
                },
            });

            await newProduct.save();
            return res.status(200).json({
                message: `Sản phẩm ${req.body.name} đã được thêm thành công.`,
            });
        }

        db.disconnectDB();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});