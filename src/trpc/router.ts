import { procedure, router } from "@/trpc/init";

export const appRouter = router({
  health: procedure.query(() => "Oh yeah!!, the server is up and running with TRPC 🚀"),
});

export type AppRouter = typeof appRouter;
