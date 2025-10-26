import { createTRPCReact } from "@trpc/react-query";
import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query";
import { type AppRouter } from "@/trpc/router";
import SuperJSON from "superjson";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });

export const trpc = createTRPCReact<AppRouter>();
export const useUtils = trpc.useUtils;
