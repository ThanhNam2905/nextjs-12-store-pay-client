import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../libs/mongodb';
import User from '../../../models/UserModel';
import bcrypt from 'bcrypt';
import db from '../../../utils/database';

db.connectDB();

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        // OAuth authentication providers...
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),

        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const email = credentials.email;
                const password = credentials.password;
                const user = await User.findOne({ email });
            
                if (user) {
                    return SignInUser({ password, user });
                } else {
                    throw new Error("Địa chỉ Email này không tồn tại!")
                }
            }
        })
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, token }) {
            let user = await User.findById(token.sub);
            session.user.id = token.sub || user._id.toString();
            session.user.username = user.username;
            session.user.role = user.role || "user";
            return session;
        }
    },
    secret: process.env.JWT_SECRET,
})


const SignInUser = async({ password, user }) => {
    if(!password) {
        throw new Error("Vui lòng nhập mật khẩu của bạn!");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
        throw new Error("Email hoặc mật khẩu của bạn không đúng");
    }

    return user;
}