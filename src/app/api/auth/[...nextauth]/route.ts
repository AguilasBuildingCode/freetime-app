// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

// Ensure NEXTAUTH_SECRET is set
if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET environment variable is not set");
}

const authOptions: NextAuthOptions = {
    // Configure Prisma adapter
    adapter: PrismaAdapter(prisma),

    // Set session strategy to JWT
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    // Define authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.dir({ credentials })
                // Basic validation
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Find user in database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                // Validate user existence and password
                if (!user || !user.password) {
                    return null;
                }

                // Compare passwords
                const isValidPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValidPassword) {
                    return null;
                }

                // Return user object without sensitive data
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
            }
        })
    ],

    // Configure JWT callbacks
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user};
        },
        async session({ session, token }) {
            return { ...session, ...token };
        }
    },

    // Configure pages
    pages: {
        signIn: "/login",
        error: "/error"
    },

    // Security settings
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
};

// Export handlers for NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
