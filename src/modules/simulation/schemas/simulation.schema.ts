import { z } from "zod";
import { SimulationMode, SessionStatus } from "@prisma/client";

export const createSimulationSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  scenarioSlug: z.string().min(1),
  mode: z.nativeEnum(SimulationMode),
  scheduledFor: z.coerce.date(),
  maxParticipants: z.number().int().min(1).max(16).default(4),
  roundDuration: z.number().int().min(1).max(60).default(10),
  timeSession: z.number().int().min(10).max(480).default(180),
});

export const updateSimulationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  scheduledFor: z.coerce.date().optional(),
  maxParticipants: z.number().int().min(1).max(16).optional(),
  roundDuration: z.number().int().min(1).max(60).optional(),
  timeSession: z.number().int().min(10).max(480).optional(),
});

export const simulationLifecycleSchema = z.object({
  simulationId: z.string().cuid(),
});

export const advanceRoundSchema = z.object({
  simulationId: z.string().cuid(),
  roundNumber: z.number().int().min(1),
});

export const getSimulationSchema = z.object({
  simulationId: z.string().cuid(),
});

export const getSimulationsSchema = z.object({
  workspaceId: z.string().cuid(),
  status: z.nativeEnum(SessionStatus).optional(),
});

export type CreateSimulationInput = z.infer<typeof createSimulationSchema>;
export type UpdateSimulationInput = z.infer<typeof updateSimulationSchema>;
export type SimulationLifecycleInput = z.infer<typeof simulationLifecycleSchema>;
export type AdvanceRoundInput = z.infer<typeof advanceRoundSchema>;
export type GetSimulationInput = z.infer<typeof getSimulationSchema>;
export type GetSimulationsInput = z.infer<typeof getSimulationsSchema>;
