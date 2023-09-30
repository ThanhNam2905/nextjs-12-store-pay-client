import { getToken } from "next-auth/jwt";
import User from "../models/UserModel";
import db from "../utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req, res, next) => {
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });
    
    db.connectDB();
    const user = await User.findById(token.sub);
    db.disconnectDB();
    if(user.role === "admin") {
        next();
    }
    else {
        res.status(401).json({ message: "Truy cập của bạn bị từ chối, người dùng phải là quản trị viên" });
    }
};