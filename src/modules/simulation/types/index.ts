import type {
  Simulation as PrismaSimulation,
  SimulationMode,
  SessionStatus,
  PlayerRole,
  Player,
  Round,
  Resource,
} from "@prisma/client";

export interface Simulation extends PrismaSimulation {
  players?: SimulationPlayer[];
  rounds?: SimulationRound[];
  resources?: SimulationResource[];
}

export interface SimulationPlayer extends Player {
  user?: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
}

export interface SimulationRound extends Round {
  decisions?: {
    id: string;
    category: string;
    playerId: string;
    submittedAt: Date;
  }[];
}

export interface SimulationResource extends Resource {}

export interface SimulationStatus {
  currentRound: number;
  status: SessionStatus;
  totalPlayers: number;
  remainingTime: number;
}

export interface SimulationConfig {
  resourceRegeneration: Record<string, number>;
  eventProbability: number;
  decisionTimeout: number;
  maxResource: number;
}

export type CreateSimulationInput = {
  name: string;
  description?: string;
  scenarioId: string;
  mode: SimulationMode;
  scheduledFor: Date;
  roundDuration?: number;
  timeSession?: number;
  workspaceId: string;
};

export type JoinSimulationInput = {
  simulationId: string;
  displayName?: string;
  color?: string;
};

export type UpdatePlayerRoleInput = {
  playerId: string;
  role: PlayerRole;
  roleConfig?: Record<string, unknown>;
};

export type AddNPCInput = {
  simulationId: string;
  displayName: string;
  role: PlayerRole;
  npcProfile: Record<string, unknown>;
};
