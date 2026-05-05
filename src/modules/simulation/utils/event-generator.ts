import { EventType, EventSeverity } from "@prisma/client";
import { prisma } from "@/lib/db";

interface EventTrigger {
  round: number;
  resourceBelow?: number;
  randomChance?: number;
  previousEvent?: string;
}

interface DynamicEvent {
  id: string;
  roundId: string;
  type: EventType;
  severity: EventSeverity;
  title: string;
  description: string;
  impact: Record<string, number>;
}

export class EventGenerator {
  private simulationId: string;
  private triggers: EventTrigger[] = [];

  constructor(simulationId: string) {
    this.simulationId = simulationId;
  }

  async loadTriggersFromScenario(): Promise<void> {
    const simulation = await prisma.simulation.findUnique({
      where: { id: this.simulationId },
      include: { scenario: true },
    });

    if (simulation?.scenario?.config) {
      const config = (simulation.scenario.config as Record<string, unknown>) || {};
      this.triggers = ((config.triggers as EventTrigger[]) || []).map((t) => ({
        round: t.round,
        resourceBelow: t.resourceBelow,
        randomChance: t.randomChance || 0.3,
        previousEvent: t.previousEvent,
      }));
    }
  }

  checkTriggers(currentRound: number, resources: Record<string, number>): boolean {
    return this.triggers.some((trigger) => {
      if (trigger.round !== currentRound) return false;
      if (trigger.resourceBelow && resources.semiconductors && resources.semiconductors > trigger.resourceBelow)
        return false;
      if (trigger.randomChance && Math.random() > trigger.randomChance) return false;
      return true;
    });
  }

  generateEvent(roundId: string, currentRound: number, resources: Record<string, number>): DynamicEvent | null {
    if (!this.checkTriggers(currentRound, resources)) return null;

    const eventTypes: EventType[] = ["RESOURCE_CRISIS", "MARKET_SHIFT", "OPERATIONAL", "EXTERNAL"];
    const severityLevels: EventSeverity[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]!;
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)]!;

    const event: DynamicEvent = {
      id: `event-${Date.now()}`,
      roundId,
      type,
      severity,
      title: `Event ${type} R${currentRound}`,
      description: `Generated event for round ${currentRound}`,
      impact: type === "RESOURCE_CRISIS" ? { semiconductors: -20 } : { reputation: -5 },
    };

    return event;
  }

  addTrigger(trigger: EventTrigger): void {
    this.triggers.push(trigger);
  }
}
