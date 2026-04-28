import { Resend } from "resend";
import { env } from "@/config/env";

export const emailProvider = new Resend(env.NEXT_PUBLIC_EMAIL_API_KEY);
