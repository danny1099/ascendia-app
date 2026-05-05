import { redis } from "@/lib/redis";
import { prisma } from "@/lib/db";

interface SimulationConfig {
  maxRounds: number;
  roundDuration: number;
  resources: Record<string, ResourceConfig>;
}

interface ResourceConfig {
  maxCapacity: number;
  regenerationRate: number;
  depletionFactor: number;
}

interface SimulationState {
  currentRound: number;
  status: string;
  resources: Record<string, number>;
  config: SimulationConfig;
  startTime: number;
  lastUpdated: number;
}

export class SimulationEngine {
  private simulationId: string;
  private state: SimulationState | null = null;

  constructor(simulationId: string) {
    this.simulationId = simulationId;
  }

  async loadState(): Promise<SimulationState | null> {
    try {
      const stateKey = `simulation:${this.simulationId}:state`;
      const cachedState = await redis.get(stateKey);

      if (cachedState) {
        this.state = JSON.parse(cachedState) as SimulationState;
        return this.state;
      }

      // Fallback to database
      const simulation = await prisma.simulation.findUnique({
        where: { id: this.simulationId },
        select: {
          currentRound: true,
          status: true,
          globalResources: true,
          roundDuration: true,
          scenario: { select: { config: true } },
          startedAt: true,
        },
      });

      if (!simulation) return null;

      this.state = {
        currentRound: simulation.currentRound,
        status: simulation.status,
        resources: (simulation.globalResources as Record<string, number>) || {},
        config: {
          maxRounds: 15,
          roundDuration: simulation.roundDuration || 10,
          resources: ((simulation.scenario as { config?: unknown })?.config as Record<string, ResourceConfig>) || {},
        },
        startTime: simulation.startedAt ? new Date(simulation.startedAt).getTime() : Date.now(),
        lastUpdated: Date.now(),
      };

      await redis.setex(stateKey, 3600, JSON.stringify(this.state));
      return this.state;
    } catch (error) {
      console.error("Error loading simulation state:", error);
      return null;
    }
  }

  async persistState(): Promise<boolean> {
    if (!this.state) return false;

    try {
      const { currentRound, resources } = this.state;

      await prisma.simulation.update({
        where: { id: this.simulationId },
        data: {
          currentRound,
          globalResources: resources,
          updatedAt: new Date(),
        },
      });

      const stateKey = `simulation:${this.simulationId}:state`;
      await redis.setex(stateKey, 3600, JSON.stringify(this.state));

      return true;
    } catch (error) {
      console.error("Error persisting simulation state:", error);
      return false;
    }
  }

  applyResourceChanges(changes: Record<string, number>): void {
    if (!this.state) return;

    for (const [resource, value] of Object.entries(changes)) {
      if (this.state.resources[resource] !== undefined) {
        this.state.resources[resource] = Math.max(
          0,
          Math.min(
            this.state.config.resources[resource]?.maxCapacity || Infinity,
            this.state.resources[resource] + value
          )
        );
      } else {
        this.state.resources[resource] = value;
      }
    }
  }

  getCurrentRound(): number {
    return this.state?.currentRound || 0;
  }

  getResources(): Record<string, number> {
    return this.state?.resources || {};
  }

  getState(): SimulationState | null {
    return this.state;
  }
}
