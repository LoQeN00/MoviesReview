import NextAuth, {} from "next-auth"
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

            if (account) {

                token.email = account.userId

                return token
            }

            return token
        },

        async session({session,token}) {

            if (token && token.email) {
                session.user.userId = token.email
            }

            return session
        }
    },

    adapter: PrismaAdapter(prisma)

})

