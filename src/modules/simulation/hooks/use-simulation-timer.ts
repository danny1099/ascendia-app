"use client";

import { useState, useEffect } from "react";

export function useSimulationTimer(startedAt: Date | null, totalMinutes: number) {
  const [remainingMinutes, setRemainingMinutes] = useState(totalMinutes);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!startedAt) {
      setRemainingMinutes(totalMinutes);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000 / 60);
      const remaining = Math.max(0, totalMinutes - elapsed);
      setRemainingMinutes(remaining);
      setIsRunning(remaining > 0);
    }, 60000);

    return () => clearInterval(interval);
  }, [startedAt, totalMinutes]);

  return {
    remainingMinutes,
    isRunning,
    formattedTime: `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m`,
  };
}
