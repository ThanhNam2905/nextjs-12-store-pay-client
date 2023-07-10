import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '../../../libs/mongodb'

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
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET,
})