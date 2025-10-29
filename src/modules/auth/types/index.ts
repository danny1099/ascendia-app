import type { User as PrismaUser } from "@prisma/client";

export interface User extends PrismaUser {
  slug?: string;
  plan?: string;
}
