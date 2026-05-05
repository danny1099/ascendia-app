import { procedure, router } from "@/trpc/init";
import { tryCatch, toSlug } from "@/shared/utils";
import { scenarioSchema } from "@/modules/scenario/schema";
import type { Scenario } from "@/modules/scenario/types";

export const scenarioRouter = router({
  create: procedure.input(scenarioSchema).mutation<APIResult<Scenario>>(async ({ ctx, input }) => {
    const { name, description, category, difficulty, maxPlayers, isTemplate, totalRounds } = input;

    /* validate if scenario slug already exists */
    const slug = toSlug(name);
    const scenarioExisting = await ctx.db.scenario.findFirst({ where: { slug } });
    if (scenarioExisting) {
      return {
        data: null,
        status: "error",
        message: "scenario_already_exists",
        code: 409,
      };
    }

    /* create scenario base */
    const { data, error } = await tryCatch(
      ctx.db.scenario.create({
        data: {
          name,
          slug,
          description,
          category,
          difficulty,
          maxPlayers,
          isTemplate,
          totalRounds,
          createdById: ctx.userId,
        },
      })
    );

    /* handle error if any occurs */
    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        code: 500,
        errorMessage: error?.message,
        error,
      };
    }

    return {
      data,
      status: "success",
      message: "organization_created",
      code: 200,
    };
  }),
  getAll: procedure.query<APIResult<Scenario[]>>(async ({ ctx }) => {
    const { data, error } = await tryCatch(
      ctx.db.scenario.findMany({
        where: { status: "ACTIVE" },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        errorMessage: error?.message,
        code: 500,
      };
    }

    return {
      data,
      status: "success",
      message: null,
      code: 200,
    };
  }),
});
