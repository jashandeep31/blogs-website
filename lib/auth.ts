import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "next-auth/jwt";
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(db) as any,
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            name: token.name,
            role: token.role,
          },
        };
      }
      return session;
    },
    jwt({ token, user }) {
      return {
        ...token,
        ...(user &&
          user.name &&
          user.id &&
          user.role && { id: user.id, role: user.role, name: user.name }),
      };
    },
  },
});
