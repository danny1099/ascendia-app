import type { User as PrismaUser, Invitation } from "@prisma/client";

export interface User extends PrismaUser {}

export interface InvitedUser extends Invitation {
  id: string;
  email: string;
  role: "member" | "owner" | "admin";
  status: "accepted" | "pending" | "canceled" | "rejected";
  expiresAt: Date;
  createdAt: Date;
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  inviterId: string;
  inviterEmail: string;
  inviterName: string;
  inviterAvatar: string;
  activeOrganization: string;
  teamName?: string;
  members?: User[];
}
