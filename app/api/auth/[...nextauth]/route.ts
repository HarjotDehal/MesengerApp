


import bcrypt from "bcrypt"

import NextAuth, {AuthOptions} from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"


import prisma from '@/app/libs/prismadb'

export const authOptions: AuthOptions ={

    adapter:PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{label:'email', type:'text'},
                password:{label:'password',type:'password'},
            },

            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid Credentials');
                }
                const user= await prisma.user.findUnique({
                    where:{
                        // find unique user by email
                        email: credentials.email
                    }
                });
                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid Credentials')
                }

                const isCorrectPassword = await bcrypt.compare(
// have to use await or else it becomes a promise. 
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPassword){
                    throw new Error('Invalid credentials')
                }
                return user;
            }
            // this is for our normal email login. 
        })

    ],
    debug: process.env.NODE_ENV ==='development',
    // useful for debugging
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// this is passing what we just made

export {handler as GET, handler as POST};
