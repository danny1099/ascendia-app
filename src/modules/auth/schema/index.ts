import { z } from "zod";

export const authSchema = z.object({
  email: z.email().nonempty({ message: "required" }).toLowerCase(),
  password: z.string().nonempty({ message: "required" }).min(6, { message: "invalid_password" }),
});

export type AuthSchema = z.infer<typeof authSchema>;
