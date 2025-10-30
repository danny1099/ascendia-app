import { UserRole, type User as PrismaUser } from "@prisma/client";

export interface User extends PrismaUser {
  role: UserRole;
  slug: string;
  plan: string;
}
