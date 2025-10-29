import { prisma } from "@/lib/db/prisma";
import { getAuthSession } from "@/modules/auth/helpers";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getAuthSession();

  return {
    ...opts,
    user: session?.user || null,
    tenantId: session?.user.tenantId || null,
    db: prisma,
  };
};
