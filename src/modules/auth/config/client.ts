import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/modules/auth/config";
import { env } from "@/config/env";

const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, useSession, signOut } = authClient;
