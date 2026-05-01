import { prisma } from "@/lib/db";
import { getAuthSession } from "@/modules/auth/session";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const auth = await getAuthSession();

  return {
    ...opts,
    db: prisma,
    userId: auth?.session.userId!,
    role: auth?.user.role!,
    organizationId: auth?.user.organizationId!,
    organization: auth?.user.organization!,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
