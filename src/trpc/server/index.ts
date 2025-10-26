import { cache } from "react";
import { headers } from "next/headers";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { appRouter, type AppRouter } from "@/trpc/router";
import { createQueryClient } from "@/trpc/client";
import { createTRPCContext } from "@/trpc/context";
import { createCaller } from "@/trpc/init";

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(appRouter);
const callerFactory = caller(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(callerFactory, getQueryClient);
