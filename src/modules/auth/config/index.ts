import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP, lastLoginMethod, customSession, organization, admin } from "better-auth/plugins";
import { sendEmailVerification, sendEmailResetPassword } from "@/modules/auth/emails";
import { sendInvitationEmail } from "@/modules/user/emails";
import { getActiveOrganization } from "@/modules/auth/helpers";
import { env } from "@/config/env";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
  baseURL: env.APP_HOST_URL,
  secret: env.AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
  },
  account: { accountLinking: { enabled: true } },
  socialProviders: {
    google: {
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
      overrideUserInfoOnSignIn: true,
      mapProfileToUser: (profile) => {
        return {
          name: profile.name,
          image: profile.picture,
        };
      },
    },
  },
  user: {
    additionalFields: {
      hasOnboarding: { type: "boolean", input: false, defaultValue: false },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, token }) => await sendEmailVerification({ email: user.email, token }),
  },
  plugins: [
    emailOTP({
      expiresIn: 5 * 60,
      sendVerificationOTP: async ({ email, otp, type }) => {
        if (type === "forget-password") await sendEmailResetPassword({ email, token: otp });
      },
    }),
    customSession(async ({ user, session }) => {
      const data = await getActiveOrganization(session.id);
      return {
        user: { ...user, ...data },
        session,
      };
    }),
    organization({
      sendInvitationEmail: async (data) => {
        const inviteLink = `${env.APP_HOST_URL}/invitations/${data.id}`;
        await sendInvitationEmail({
          email: data.email,
          inviterName: data.inviter.user.name,
          invitedEmail: data.inviter.user.email,
          teamName: data.organization.name,
          inviteLink,
        });
      },
    }),
    admin(),
    lastLoginMethod(),
    nextCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
