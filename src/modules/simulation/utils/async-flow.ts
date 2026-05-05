import { prisma } from "@/lib/db";

export interface AsyncStep {
  id: string;
  roundNumber: number;
  status: "waiting" | "ready" | "processing" | "completed";
  action?: Record<string, unknown>;
}

export class AsyncFlowManager {
  private simulationId: string;
  private steps: AsyncStep[] = [];

  constructor(simulationId: string) {
    this.simulationId = simulationId;
  }

  async loadSteps(): Promise<AsyncStep[]> {
    const rounds = await prisma.round.findMany({
      where: { simulationId: this.simulationId },
      orderBy: { roundNumber: "asc" },
    });

    this.steps = rounds.map((round) => ({
      id: round.id,
      roundNumber: round.roundNumber,
      status: round.status === "COMPLETED" ? "completed" : "waiting",
    }));

    return this.steps;
  }

  async advanceStep(roundNumber: number, action: Record<string, unknown>): Promise<AsyncStep> {
    const step = this.steps.find((s) => s.roundNumber === roundNumber);
    if (!step) {
      throw new Error(`Step for round ${roundNumber} not found`);
    }

    step.status = "processing";
    step.action = action;

    await prisma.round.update({
      where: { id: step.id },
      data: { status: "PROCESSING" },
    });

    step.status = "completed";
    return step;
  }
}
