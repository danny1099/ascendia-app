import { useState, useEffect } from "react";
import type { SimulationStatus } from "@/modules/simulation/types";
import { trpc } from "@/trpc/client";

export function useSimulationState(simulationId: string) {
  const { data: simulation } = trpc.simulation.getById.useQuery({
    param: simulationId,
  });

  const [status, setStatus] = useState<SimulationStatus>({
    currentRound: 0,
    status: "SCHEDULED",
    totalPlayers: 0,
    remainingTime: 0,
  });

  useEffect(() => {
    if (simulation?.data) {
      const sim = simulation.data;
      setStatus({
        currentRound: sim.currentRound,
        status: sim.status,
        totalPlayers: sim.players?.length || 0,
        remainingTime: sim.timeSession || 180,
      });
    }
  }, [simulation]);

  return status;
}
