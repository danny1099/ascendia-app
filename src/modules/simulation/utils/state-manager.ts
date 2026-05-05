import { redis } from "@/lib/redis";

interface StateSnapshot {
  timestamp: number;
  round: number;
  resources: Record<string, number>;
  decisions: string[];
  events: string[];
}

export class StateManager {
  private simulationId: string;

  constructor(simulationId: string) {
    this.simulationId = simulationId;
  }

  async getCurrentState(): Promise<Record<string, unknown> | null> {
    const stateKey = `simulation:${this.simulationId}:state`;
    const state = await redis.get(stateKey);
    return state ? JSON.parse(state) : null;
  }

  async updateState(updates: Record<string, unknown>): Promise<void> {
    const stateKey = `simulation:${this.simulationId}:state`;
    const currentState = (await this.getCurrentState()) || {};
    const newState = { ...currentState, ...updates, lastUpdated: Date.now() };
    await redis.setex(stateKey, 3600, JSON.stringify(newState));
  }

  async pushStateSnapshot(snapshot: StateSnapshot): Promise<void> {
    const historyKey = `simulation:${this.simulationId}:history`;
    await redis.lpush(historyKey, JSON.stringify(snapshot));
    await redis.ltrim(historyKey, 0, 299); // Keep last 300 snapshots
  }

  async getStateHistory(limit: number = 50): Promise<StateSnapshot[]> {
    const historyKey = `simulation:${this.simulationId}:history`;
    const rawHistory = await redis.lrange(historyKey, 0, limit - 1);
    return rawHistory.map((item) => JSON.parse(item)) as StateSnapshot[];
  }

  async invalidateState(): Promise<void> {
    const stateKey = `simulation:${this.simulationId}:state`;
    await redis.del(stateKey);
  }
}
