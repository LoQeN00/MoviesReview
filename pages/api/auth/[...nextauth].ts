import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import { prisma } from "../../../lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"


export default NextAuth({

    providers: [
        FacebookProvider({
            name: 'facebook',
            clientId: "330364998952943",
            clientSecret: "0b052f92e159c8487d79373420f37fc9"
        })
    ],
    
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },

    callbacks: {
        async jwt({token,account,user}) {

            if (user) {
                token.userId = user.id
            }

            return token
        },

        async session({session,token}) {

            if (session && session.user && token.userId) {
                session.user.userId = token.userId
            }
            
            
            return session
        }
    },

    adapter: PrismaAdapter(prisma)

})

