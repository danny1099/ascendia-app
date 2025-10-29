import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { tryCatch } from "@/shared/utils";
import { trpc } from "@/trpc/server";
import { env } from "@/config/env";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
      tenantId: string;
      slug: string;
    } & DefaultSession["user"];
  }

  interface User {
    role?: UserRole;
    tenantId?: string;
    slug?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
    tenantId: string;
    slug: string;
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as { email: string; password: string };
        const { data, error } = await tryCatch(trpc.auth.signInWithEmail({ email, password }));

        if (error) return null;

        /* return user data if successfully signed in */
        const { result: user } = data;

        return {
          id: user?.id as string,
          name: user?.name as string,
          email: user?.email as string,
          role: user?.role as UserRole,
          tenantId: user?.tenantId as string,
          slug: user?.slug as string,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id as string;
        token.name = user.name as string;
        token.email = user.email as string;
        token.role = user.role as UserRole;
        token.tenantId = user.tenantId as string;
        token.slug = user.slug as string;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
        session.user.tenantId = token.tenantId as string;
        session.user.slug = token.slug as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
