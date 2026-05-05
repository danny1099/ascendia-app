import { z } from "zod";

export const createSimulationSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  description: z.string().optional(),
  scenarioId: z.string().min(1, { message: "required" }),
  code: z.string().min(1, { message: "required" }),
  mode: z.enum(["INDIVIDUAL", "GRUPAL"], { message: "required" }),
  scheduledFor: z.coerce.date(),
  roundDuration: z.number().min(1).max(120).optional().default(10),
  timeSession: z.number().min(1).max(480).optional().default(180),
  workspaceId: z.string().min(1, { message: "required" }),
});

export const joinSimulationSchema = z.object({
  simulationId: z.string().min(1, { message: "required" }),
  displayName: z.string().optional(),
  color: z.string().optional(),
  isNPC: z.boolean(),
  role: z.enum(["LEADER", "COORDINATOR", "SPECIALIST", "OBSERVER", "ANALYST", "AI_TEAMMATE"]),
});

export const updatePlayerRoleSchema = z.object({
  playerId: z.string().min(1, { message: "required" }),
  role: z.enum(["LEADER", "COORDINATOR", "SPECIALIST", "OBSERVER", "ANALYST", "AI_TEAMMATE"]),
  roleConfig: z.record(z.string(), z.unknown()).optional(),
});

export const addNPCSchema = z.object({
  simulationId: z.string().min(1, { message: "required" }),
  displayName: z.string().min(1, { message: "required" }),
  role: z.enum(["LEADER", "COORDINATOR", "SPECIALIST", "OBSERVER", "ANALYST", "AI_TEAMMATE"]),
  npcProfile: z.record(z.string(), z.unknown()),
});

export type CreateSimulationSchema = z.infer<typeof createSimulationSchema>;
export type JoinSimulationSchema = z.infer<typeof joinSimulationSchema>;
export type UpdatePlayerRoleSchema = z.infer<typeof updatePlayerRoleSchema>;
export type AddNPCSchema = z.infer<typeof addNPCSchema>;
