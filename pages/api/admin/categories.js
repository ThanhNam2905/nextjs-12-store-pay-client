import { createRouter } from 'next-connect';
import auth from '../../../middleware/auth';
import admin from '../../../middleware/admin';
import db from '../../../utils/database';
import Category from '../../../models/CategoryModel';
import slugify from 'slugify';

const router = createRouter().use(auth).use(admin);

router.post(async(req, res) => {
    try {
        await db.connectDB();
        const { name } = req.body;
        const checkCategory = await Category.findOne({ name });
        if(checkCategory) {
            return res.status(400).json({ message: `Tên danh mục ${name} này đã tồn tại. Vui lòng thử với tên khác.`})
        }
        await new Category({ 
            name, 
            slug: slugify(name)
        }).save();
        await db.disconnectDB();
        return res.status(200).json({
            message: `Tên  danh mục ${name} được tạo thành công!`,
            categories: await Category.find({}).sort({ updatedAt: -1}),
        });
    } catch (error) {
        await db.disconnectDB();
        return res.status(500).json({ message: error.message });
    }
});

router.delete(async(req, res) => {
    try {
        await db.connectDB();
        const { id, name } = req.body;
        await Category.findByIdAndRemove(id);
        await db.disconnectDB();
        return res.status(200).json({
            message: `Danh mục ${name} được xóa thành công!`,
            categories: await Category.find({}).sort({ createdAt: -1}),
        })
    } catch (error) {
        await db.disconnectDB();
        return res.status(500).json({ message: error.message });
    }
});

router.put(async(req, res) => {
    try {
        await db.connectDB();
        const { id, name } = req.body;
        const checkCategory = await Category.findOne({ name });
        if(checkCategory) {
            return res.status(400).json({ message: `Tên danh mục ${name} này đã tồn tại. Vui lòng thử với tên khác.`})
        }
        await Category.findByIdAndUpdate(id, { 
            name, 
            updatedAt: Date.now(),
        });
        await db.disconnectDB();
        return res.status(200).json({
            message: "Danh mục đã được chỉnh sửa thành công",
            categories: await Category.find({}).sort({ createdAt: -1}),
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