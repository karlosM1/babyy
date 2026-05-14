import { useCallback } from "react";
import { SectionShell } from "./ui/SectionShell";

type FinalSurpriseProps = {
  onCelebrateAgain: () => void;
};

export function FinalSurprise({ onCelebrateAgain }: FinalSurpriseProps) {
  const handleReplay = useCallback(() => {
    onCelebrateAgain();
  }, [onCelebrateAgain]);

  return (
    <section
      aria-labelledby="finale-heading"
      className="relative overflow-hidden bg-gradient-to-b from-peach/40 via-blush to-cream py-20 sm:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-rose/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-lilac/40 blur-3xl" />
        <div className="animate-shimmer absolute inset-x-0 top-24 mx-auto h-px max-w-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-70" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute animate-float text-2xl opacity-40"
            style={{
              left: `${8 + i * 7}%`,
              bottom: "-5%",
              animationDelay: `${i * 0.25}s`,
            }}
          >
            💖
          </span>
        ))}
      </div>
      <SectionShell className="relative z-10 text-center">
        <h2 id="finale-heading" className="font-display text-3xl text-slate-900 sm:text-4xl">
          One more thing…
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-xl font-semibold leading-relaxed text-slate-800 sm:text-2xl">
          I love you more than words can say 💖
        </p>
        <button
          type="button"
          onClick={handleReplay}
          className="mt-10 inline-flex min-h-[48px] min-w-[220px] items-center justify-center rounded-full border border-white/70 bg-white/80 px-8 py-3 text-base font-semibold text-rose shadow-lg shadow-rose/20 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
        >
          Celebrate Again
        </button>
      </SectionShell>
    </section>
  );
}
