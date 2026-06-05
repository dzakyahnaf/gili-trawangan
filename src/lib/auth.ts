import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

// Mock admin credentials for development (no DB needed)
const MOCK_ADMIN = {
  id: "admin-1",
  email: "admin@rhtour.com",
  password: "$2b$12$Q98H.rc0h1Axxp.LXiDz..TMz3zNrgDj6w6oxO/K6Jk0VtJ8ZTZWW", // "admin123"
  name: "Admin RH Tour",
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || "xPOYYIbZPuHO6I6cDId/ZYN+iWnyKQI+6xhfdI4PZPo=",
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Try database first
        try {
          const dbAdmin = await prisma.admin.findUnique({
            where: { email },
          });

          if (dbAdmin) {
            const isValid = await compare(password, dbAdmin.password);
            if (isValid) {
              return {
                id: dbAdmin.id,
                email: dbAdmin.email,
                name: dbAdmin.name,
              };
            }
          }
        } catch (error) {
          console.error("Database auth error:", error);
        }

        // Fallback to mock admin for safety/initial setup
        if (email === MOCK_ADMIN.email) {
          const isValid = await compare(password, MOCK_ADMIN.password);
          if (isValid) {
            return {
              id: MOCK_ADMIN.id,
              email: MOCK_ADMIN.email,
              name: MOCK_ADMIN.name,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
