import { createAuthClient } from "better-auth/react";
import { env } from "@/config/env";

const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
});

export const { signIn, signUp, useSession } = authClient;
