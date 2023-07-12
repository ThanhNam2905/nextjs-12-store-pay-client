
import { createRouter } from 'next-connect';
import bcrypt from 'bcrypt';
import db from '../../../utils/database';
import { validateEmail } from '../../../utils/validation';
import User from '../../../models/UserModel';

const router = createRouter();

router.post(async (req, res) => {
    await db.connectDB();
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400).json({ message: "Vui lòng điền đầy đủ tất cả các thông tin!" });
    }
    if(!validateEmail(email)) {
        res.status(400).json({ message: "Định dạng Email không đúng!"});
    }
    if(password.length < 6) {
        res.status(400).json({ message: "Mật khẩu phải có ít nhất 6 ký tự!" })
    }

    const user = await User.findOne({ email });
    if(user) {
        res.status(400).json({ message: "Địa chỉ Email này đã tồn tại!"})
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        username, 
        email,
        password: cryptedPassword,
    });
    const addedUser = await newUser.save();
    res.send(addedUser);
})

export default router.handler({
    onError: (error, req, res) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
});