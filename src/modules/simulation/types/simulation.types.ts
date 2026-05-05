import { Simulation as PrismaSimulation, SimulationMode, SessionStatus } from "@prisma/client";

export interface Simulation extends PrismaSimulation {
  scenario?: {
    id: string;
    name: string;
    slug: string;
    category: string;
    difficulty: string;
  };
  workspace?: {
    id: string;
    name: string;
    slug: string;
  };
  createdByUser?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface SimulationState {
  simulationId: string;
  currentRound: number;
  status: SessionStatus;
  resources: Record<string, number>;
  players: PlayerState[];
  events: EventState[];
}

export interface PlayerState {
  playerId: string;
  userId?: string;
  displayName: string;
  role: string;
  isNPC: boolean;
  color: string;
  joinedAt: Date;
  finalScore?: number;
  competencies?: Record<string, number>;
}

export interface EventState {
  eventId: string;
  roundNumber: number;
  type: string;
  severity: string;
  title: string;
  description: string;
  impact: Record<string, number>;
  triggeredAt: Date;
}

export interface CreateSimulationInput {
  name: string;
  description?: string;
  scenarioSlug: string;
  mode: SimulationMode;
  scheduledFor: Date;
  maxParticipants?: number;
  roundDuration?: number;
  timeSession?: number;
}

export interface UpdateSimulationInput {
  name?: string;
  description?: string;
  scheduledFor?: Date;
  maxParticipants?: number;
  roundDuration?: number;
  timeSession?: number;
}

export interface SimulationLifecycleInput {
  simulationId: string;
}

export interface AdvanceRoundInput {
  simulationId: string;
  roundNumber: number;
}
