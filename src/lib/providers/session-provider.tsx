"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export const SessionProvider = ({ children }: Children) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
