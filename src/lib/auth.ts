import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

// Mock admin credentials for development (no DB needed)
const MOCK_ADMIN = {
  id: "admin-1",
  email: "admin@rhtour.com",
  password: "$2a$12$LJ3m6gKz.AiEfWCw2sFhzuqXwNZ2bVpWxRqhJHdFqTdLh2BC3.KWy", // "admin123"
  name: "Admin RH Tour",
};

export const { handlers, auth, signIn, signOut } = NextAuth({
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

        // Use mock admin for development
        if (email !== MOCK_ADMIN.email) return null;

        const isValid = await compare(password, MOCK_ADMIN.password);
        if (!isValid) return null;

        return {
          id: MOCK_ADMIN.id,
          email: MOCK_ADMIN.email,
          name: MOCK_ADMIN.name,
        };
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
