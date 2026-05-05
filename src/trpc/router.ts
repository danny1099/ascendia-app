import { procedure, router } from "@/trpc/init";
import { onboardingRouter } from "@/modules/onboarding/router";
import { organizationRouter } from "@/modules/organization/router";
import { scenarioRouter } from "@/modules/scenario/router";
import { userRouter } from "@/modules/user/router";
import { workspaceRouter } from "@/modules/workspace/router";
import { simulationRouter } from "@/modules/simulation/router";

export const appRouter = router({
  health: procedure.query(() => "The server is up and running and healthy!"),
  onboarding: onboardingRouter,
  organization: organizationRouter,
  workspace: workspaceRouter,
  scenario: scenarioRouter,
  user: userRouter,
  simulation: simulationRouter,
});

export type AppRouter = typeof appRouter;
