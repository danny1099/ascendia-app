import { z } from "zod";

const name = z.string().min(3, { message: "invalid_name" });
const avatar = z.string().optional();
const email = z.string().email({ message: "invalid_email" });
const role = z.enum(["owner", "admin", "member"], { error: "required" });
const organizationId = z.string().nonempty({ message: "required" });
const password = z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  message: "invalid_password",
});

export const userSchema = z.object({
  name: name,
  avatar: avatar,
  email: email,
  role: role,
  organizationId: organizationId,
  password: password,
});

export const userInvitationSchema = z.object({
  email: email,
  role: role,
});

export const userSetPasswordSchema = z.object({
  password: password,
  confirm_password: z.string().nonempty({ message: "required" }),
  userId: z.string().nonempty({ message: "required" }),
});

export type UserSchema = z.infer<typeof userSchema>;
export type UserInvitationSchema = z.infer<typeof userInvitationSchema>;
export type UserSetPasswordSchema = z.infer<typeof userSetPasswordSchema>;
