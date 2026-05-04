import { Workspace as PrismaWorkspace } from "@prisma/client";

export interface Workspace extends PrismaWorkspace {
  organization?: string;
}
