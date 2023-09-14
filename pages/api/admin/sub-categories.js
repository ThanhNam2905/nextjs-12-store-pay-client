import { createRouter } from 'next-connect';
import auth from '../../../middleware/auth';
import db from '../../../utils/database';
import SubCategory from '../../../models/SubCategoryModel';
import slugify from 'slugify';
import Category from '../../../models/CategoryModel';

const router = createRouter().use(auth);

router.post(async(req, res) => {
    try {
        await db.connectDB();
        const { name, parent } = req.body;
        const checkSubCategory = await SubCategory.findOne({ name });
        if(checkSubCategory) {
            return res.status(400).json({ message: `Tên danh mục phụ ${name} này đã tồn tại. Vui lòng thử với tên khác.`})
        }
        await new SubCategory({ 
            name, 
            slug: slugify(name),
            parent,
        }).save();
        await db.disconnectDB();
        return res.status(200).json({
            message: `Tên  danh mục phụ ${name} được tạo thành công!`,
            subCategories: await SubCategory.find({})
                .populate({path: "parent", model: Category})
                .sort({ updatedAt: -1})
                .lean(),
        });
    } catch (error) {
        await db.disconnectDB();
        console.log(("error ==>", error));
        return res.status(500).json({ message: error.message });
    }
});

router.delete(async(req, res) => {
    try {
        await db.connectDB();
        const { id, name } = req.body;
        await SubCategory.findByIdAndRemove(id);
        await db.disconnectDB();
        return res.status(200).json({
            message: `Danh mục phụ ${name} được xóa thành công!`,
            subCategories: await SubCategory.find({})
            .populate({path: "parent", model: Category})
            .sort({ updatedAt: -1})
            .lean(),
        })
    } catch (error) {
        await db.disconnectDB();
        return res.status(500).json({ message: error.message });
    }
});

router.put(async(req, res) => {
    try {
        await db.connectDB();
        const { id, name, parent } = req.body;
        // const checkSubCategory = await SubCategory.findOne({ name });
        // if(checkSubCategory) {
        //     return res.status(400).json({ message: `Tên danh mục phụ ${name} này đã tồn tại. Vui lòng thử với tên khác.`})
        // }
        await SubCategory.findByIdAndUpdate(id, { 
            name, 
            slug: slugify(name),
            parent,
            updatedAt: Date.now(),
        });
        await db.disconnectDB();
        return res.status(200).json({
            message: "Danh mục đã được chỉnh sửa thành công",
            subCategories: await SubCategory.find({})
                .populate({path: "parent", model: Category})
                .sort({ createdAt: -1})
                .lean(),
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