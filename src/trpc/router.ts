import { procedure, router } from "@/trpc/init";
import { onboardingRouter } from "@/modules/onboarding/router";
import { organizationRouter } from "@/modules/organization/router";
import { workspaceRouter } from "@/modules/workspace/router";
import { userRouter } from "@/modules/user/router";

export const appRouter = router({
  health: procedure.query(() => "The server is up and running and healthy!"),
  onboarding: onboardingRouter,
  organization: organizationRouter,
  workspace: workspaceRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
