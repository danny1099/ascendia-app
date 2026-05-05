import { Scenario as PrismaScenario, ScenarioDifficulty, ScenarioType, Status } from "@prisma/client";

export interface Scenario extends PrismaScenario {}

export interface ScenarioMock {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: ScenarioType;
  difficulty: ScenarioDifficulty;
  maxPlayers: number;
  totalRounds: number;
  isTemplate: boolean;
  status: Status;
  config: ScenarioConfig;
  createdById: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ResourceDefinition = {
  id: string;
  name: string;
  description: string;
  totalCapacity: number;
  regenerationRate: number;
  criticalThreshold: number;
  criticalPenalty: string;
  isPrimary: boolean;
};

export type PhaseDefinition = {
  phase: number;
  name: string;
  rounds: [number, number];
  focus: string;
  events: CrisisEvent[];
};

export type CrisisEvent = {
  round: number;
  id: string;
  title: string;
  description: string;
  impact: Record<string, string | number>;
};

export type RoleDefinition = {
  id: string;
  name: string;
  activePhases: number[];
  isRotating: boolean;
  abilities: string[];
  responsibility: string;
};

export type DecisionCategory = {
  id: string;
  name: string;
  timeMinutes: number;
  options: DecisionOption[];
};

export type DecisionOption = {
  id: string;
  label: string;
  choices: string[];
};

export type ScoringDimension = {
  id: string;
  name: string;
  weight: number;
  description: string;
  kpis: string[];
};

export type CompetencyDefinition = {
  id: string;
  name: string;
  range: [number, number];
  indicator: string;
  benchmark: string;
};

export type ScenarioConfig = {
  resources: ResourceDefinition[];
  phases: PhaseDefinition[];
  roles: RoleDefinition[];
  decisionCategories: DecisionCategory[];
  scoring: ScoringDimension[];
  competencies: CompetencyDefinition[];
};
