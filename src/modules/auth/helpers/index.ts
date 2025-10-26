import { cache } from "react";
import { auth } from "@/modules/auth/config";
import { headers } from "next/headers";

export const getAuthSession = cache(
  async () =>
    await auth.api.getSession({
      headers: await headers(),
    })
);
