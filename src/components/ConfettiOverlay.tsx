import type { ConfettiPiece } from "../hooks/useConfetti";

type ConfettiOverlayProps = {
  pieces: ConfettiPiece[];
  layerKey: string;
};

export function ConfettiOverlay({ pieces, layerKey }: ConfettiOverlayProps) {
  if (pieces.length === 0) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={`${layerKey}-${p.id}`}
          className="absolute will-change-transform"
          style={{
            left: `${p.leftPct}%`,
            top: "-12%",
            width: p.shape === "circle" ? p.sizePx : p.sizePx * 0.45,
            height: p.sizePx,
            borderRadius: p.shape === "circle" ? "9999px" : "3px",
            backgroundColor: `hsl(${String(p.hue)} 90% 72%)`,
            boxShadow: "0 0 0 1px rgba(255,255,255,0.25)",
            animation: `confetti-fall ${String(p.durationMs)}ms linear ${String(p.delayMs)}ms forwards`,
            ["--drift" as string]: `${String(p.driftPx)}px`,
          }}
        />
      ))}
    </div>
  );
}
