import { procedure, router } from "@/trpc/init";
import { onboardingRouter } from "@/modules/onboarding/router";

export const appRouter = router({
  health: procedure.query(() => "The server is up and running and healthy!"),
  onboarding: onboardingRouter,
});

export type AppRouter = typeof appRouter;
