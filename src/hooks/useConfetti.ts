import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type ConfettiPiece = {
  id: string;
  leftPct: number;
  delayMs: number;
  durationMs: number;
  hue: number;
  sizePx: number;
  driftPx: number;
  shape: "rect" | "circle";
};

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createPieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    leftPct: randomBetween(0, 100),
    delayMs: Math.floor(randomBetween(0, 400)),
    durationMs: Math.floor(randomBetween(2200, 4200)),
    hue: Math.floor(randomBetween(320, 360)),
    sizePx: Math.floor(randomBetween(6, 12)),
    driftPx: Math.floor(randomBetween(-80, 80)),
    shape: Math.random() > 0.45 ? "rect" : "circle",
  }));
}

export function useConfetti(initialBurst = 48) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>(() => createPieces(initialBurst));
  const [generation, setGeneration] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const burst = useCallback((count = 36) => {
    if (reducedMotionRef.current) {
      setPieces([]);
      setGeneration((g) => g + 1);
      return;
    }
    setPieces(createPieces(count));
    setGeneration((g) => g + 1);
  }, []);

  const replay = useCallback(() => {
    burst(initialBurst);
  }, [burst, initialBurst]);

  const key = useMemo(() => `confetti-${generation}`, [generation]);

  return { pieces, burst, replay, key };
}
