import { procedure, router, param } from "@/trpc/init";
import { generateRandomString, tryCatch } from "@/shared/utils";
import { createSimulationSchema, joinSimulationSchema } from "@/modules/simulation/schema";
import type { Simulation, SimulationPlayer } from "@/modules/simulation/types";

export const simulationRouter = router({
  create: procedure.input(createSimulationSchema).mutation<APIResult<Simulation>>(async ({ ctx, input }) => {
    const { name, description, scenarioId, mode, scheduledFor, roundDuration, timeSession, workspaceId } = input;

    /* Check if scenario exists */
    if (!scenarioId) {
      return {
        data: null,
        status: "error" as const,
        message: "scenario_not_found",
        code: 404,
      };
    }

    /* Create simulation and generate code for it */
    const code = generateRandomString();
    const { data, error } = await tryCatch(
      ctx.db.simulation.create({
        data: {
          name,
          code: `sim-${code}`,
          description,
          scenarioId,
          mode,
          scheduledFor,
          roundDuration,
          timeSession,
          workspaceId,
          organizationId: ctx.organizationId,
          createdBy: ctx.userId,
          globalResources: {},
          currentRound: 0,
        },
        include: {
          scenario: true,
          players: true,
          rounds: true,
          resources: true,
        },
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
      message: "simulation_created",
      code: 200,
    };
  }),
  start: procedure.input(param).mutation<APIResult<Simulation>>(async ({ ctx, input }) => {
    const { param: simulationId } = input;

    const { data, error } = await tryCatch(
      ctx.db.simulation.update({
        where: { id: simulationId, organizationId: ctx.organizationId },
        data: { status: "IN_PROGRESS", startedAt: new Date(), currentRound: 1 },
        include: {
          scenario: true,
          players: { include: { user: true } },
          rounds: { include: { events: true, decisions: true } },
          resources: true,
        },
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
      message: "simulation_started",
      code: 200,
    };
  }),
  pause: procedure.input(param).mutation<APIResult<Simulation>>(async ({ ctx, input }) => {
    const { param: simulationId } = input;

    const { data, error } = await tryCatch(
      ctx.db.simulation.update({
        where: { id: simulationId, organizationId: ctx.organizationId },
        data: { status: "PAUSED" },
        include: {
          scenario: true,
          players: { include: { user: true } },
          rounds: { include: { events: true, decisions: true } },
          resources: true,
        },
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
      message: "simulation_paused",
      code: 200,
    };
  }),
  resume: procedure.input(param).mutation<APIResult<Simulation>>(async ({ ctx, input }) => {
    const { param: simulationId } = input;

    const { data, error } = await tryCatch(
      ctx.db.simulation.update({
        where: { id: simulationId, organizationId: ctx.organizationId },
        data: { status: "IN_PROGRESS" },
        include: {
          scenario: true,
          players: { include: { user: true } },
          rounds: { include: { events: true, decisions: true } },
          resources: true,
        },
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
      message: "simulation_resumed",
      code: 200,
    };
  }),
  cancel: procedure.input(param).mutation<APIResult<Simulation>>(async ({ ctx, input }) => {
    const { param: simulationId } = input;

    const { data, error } = await tryCatch(
      ctx.db.simulation.update({
        where: { id: simulationId, organizationId: ctx.organizationId },
        data: { status: "CANCELLED" },
        include: {
          scenario: true,
          players: { include: { user: true } },
          rounds: { include: { events: true, decisions: true } },
          resources: true,
        },
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
      message: "simulation_cancelled",
      code: 200,
    };
  }),
  getById: procedure.input(param).query<APIResult<Simulation>>(async ({ ctx, input }) => {
    const { param: simulationId } = input;

    const { data, error } = await tryCatch(
      ctx.db.simulation.findUnique({
        where: { id: simulationId, organizationId: ctx.organizationId },
        include: {
          scenario: true,
          players: { include: { user: true } },
          rounds: { include: { events: true, decisions: true } },
          resources: true,
        },
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
  getAll: procedure.input(param).query<APIResult<Simulation[]>>(async ({ ctx, input }) => {
    const { param: workspace } = input;

    const foundworkspace = await ctx.db.workspace.findFirst({
      where: { slug: workspace, organizationId: ctx.organizationId },
    });
    if (!foundworkspace) {
      return {
        data: null,
        status: "error",
        message: "workspace_not_found",
        code: 404,
      };
    }

    const workspaceId = foundworkspace.id;
    const { data, error } = await tryCatch(
      ctx.db.simulation.findMany({
        where: {
          workspaceId,
          organizationId: ctx.organizationId,
        },
        orderBy: { createdAt: "desc" },
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
  joinAsPlayer: procedure.input(joinSimulationSchema).mutation<APIResult<SimulationPlayer>>(async ({ ctx, input }) => {
    const { simulationId, displayName, color, role, isNPC } = input;

    /* Check if simulation exists and is in a joinable state */
    const simulation = await ctx.db.simulation.findUnique({
      where: { id: simulationId, organizationId: ctx.organizationId },
    });
    if (!simulation) {
      return {
        data: null,
        status: "error",
        message: "simulation_not_found",
        code: 404,
      };
    }

    /* validate status of simulation to ensure it is in a joinable state */
    if (simulation.status !== "IN_PROGRESS" && simulation.status !== "SCHEDULED" && simulation.status !== "WAITING") {
      return {
        data: null,
        status: "error",
        message: "simulation_cannot_join",
        code: 403,
      };
    }

    const { data, error } = await tryCatch(
      ctx.db.player.create({
        data: {
          userId: ctx.userId,
          displayName: displayName || "NPC",
          color: color || "#6366f1",
          simulationId,
          role,
          isNPC,
        },
        include: {
          user: {
            select: { id: true, name: true, email: true, image: true },
          },
        },
      })
    );

    if (error || !data) {
      return {
        data: null,
        status: "error",
        message: "unknown_error",
        code: 500,
        errorMessage: error?.message,
      };
    }

    return {
      data,
      status: "success",
      message: "simulation_player_joined",
      code: 200,
    };
  }),
});
