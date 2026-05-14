import { lazy, Suspense, useCallback } from "react";

const BirthdayScene = lazy(async () => {
  const mod = await import("./BirthdayScene");
  return { default: mod.BirthdayScene };
});

type BirthdayHeroProps = {
  onOpenSurprise: () => void;
  onCakeMagic: () => void;
};

export function BirthdayHero({
  onOpenSurprise,
  onCakeMagic,
}: BirthdayHeroProps) {
  const handleSparkles = useCallback(() => {
    onCakeMagic();
  }, [onCakeMagic]);

  return (
    <header className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-b from-blush via-cream to-lilac/40 px-4 pb-10 pt-8 sm:px-8 sm:pt-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,182,193,0.35),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(196,181,253,0.35),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(255,213,200,0.45),transparent_55%)]"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-col justify-centenr text-center lg:max-w-md lg:text-left">
          <p className="animate-fade-up font-sans text-sm font-semibold uppercase tracking-[0.2em] text-rose/90 opacity-0 [animation-delay:80ms]">
            A tiny universe for you
          </p>
          <h1 className="animate-fade-up mt-3 font-display text-4xl leading-tight text-slate-900 opacity-0 [animation-delay:160ms] sm:text-5xl">
            Happy Birthday, Baby 🎂
          </h1>
          <p className="animate-fade-up mx-auto mt-4 max-w-prose text-base text-slate-700 opacity-0 [animation-delay:240ms] sm:text-lg lg:mx-0">
            Today is all about you — the most special person in my life.
          </p>
          <div className="animate-fade-up mt-8 flex flex-col items-center gap-3 opacity-0 [animation-delay:320ms] sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={onOpenSurprise}
              className="pointer-events-auto inline-flex min-h-[48px] min-w-[200px] items-center justify-center rounded-full bg-gradient-to-r from-rose to-peach px-8 py-3 text-base font-semibold text-white shadow-lg shadow-rose/30 transition hover:translate-y-[-2px] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              Open My Surprise
            </button>
            <button
              type="button"
              onClick={handleSparkles}
              className="pointer-events-auto text-sm font-semibold text-slate-700 underline-offset-4 transition hover:text-rose hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              Send sparkles ✨
            </button>
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <Suspense
              fallback={
                <div
                  className="flex h-[min(72vh,560px)] min-h-[280px] w-full items-center justify-center rounded-3xl border border-white/50 bg-gradient-to-br from-blush/80 to-lilac/40 text-sm font-semibold text-slate-600 shadow-inner"
                  role="status"
                  aria-live="polite"
                >
                  Loading your little world…
                </div>
              }
            >
              <BirthdayScene onCakeClick={onCakeMagic} />
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
