import { prisma } from "@/lib/db";

interface ResourceSnapshot {
  resourceType: string;
  currentLevel: number;
  maxCapacity: number;
  regenerationRate: number;
  depletion: number;
  utilization: number;
}

interface ResourceThresholds {
  critical: number;
  low: number;
  optimal: number;
}

export class ResourceCalculator {
  private snapshots: ResourceSnapshot[] = [];

  addSnapshot(snapshot: ResourceSnapshot): void {
    this.snapshots.push(snapshot);
  }

  calculateUtilization(current: number, max: number): number {
    return max > 0 ? (current / max) * 100 : 0;
  }

  calculateDepletion(current: number, initial: number): number {
    if (initial === 0) return 0;
    return ((initial - current) / initial) * 100;
  }

  calculateRegeneration(baseRate: number, events: string[]): number {
    let modifier = 1.0;
    if (events.includes("drought")) modifier -= 0.3;
    if (events.includes("boom")) modifier += 0.2;
    return baseRate * modifier;
  }

  getThresholdStatus(
    current: number,
    max: number,
    thresholds: ResourceThresholds
  ): "CRITICAL" | "LOW" | "OPTIMAL" | "HIGH" {
    const percentage = max > 0 ? (current / max) * 100 : 0;
    if (percentage <= thresholds.critical) return "CRITICAL";
    if (percentage <= thresholds.low) return "LOW";
    if (percentage >= thresholds.optimal) return "OPTIMAL";
    return "HIGH";
  }

  getAggregatedSnapshot(): Record<string, number> {
    const aggregated: Record<string, number> = {};
    for (const snapshot of this.snapshots) {
      aggregated[snapshot.resourceType] = snapshot.currentLevel;
    }
    return aggregated;
  }

  clear(): void {
    this.snapshots = [];
  }
}

export async function getResourceState(
  simulationId: string,
  roundNumber: number
): Promise<Record<string, ResourceSnapshot>> {
  const resources = await prisma.resource.findMany({
    where: { simulationId, roundNumber },
  });

  const state: Record<string, ResourceSnapshot> = {};
  for (const resource of resources) {
    state[resource.resourceType] = {
      resourceType: resource.resourceType,
      currentLevel: resource.currentLevel,
      maxCapacity: resource.maxCapacity,
      regenerationRate: resource.regenerationRate,
      depletion: resource.depletion,
      utilization: resource.utilization,
    };
  }

  return state;
}
