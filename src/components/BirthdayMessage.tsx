import { forwardRef } from "react";
import { SectionShell } from "./ui/SectionShell";

export const BirthdayMessage = forwardRef<HTMLElement, object>(function BirthdayMessage(_props, ref) {
  return (
    <section
      ref={ref}
      aria-labelledby="message-heading"
      className="relative scroll-mt-6 bg-gradient-to-b from-cream via-petal to-lilac/30 py-16 sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-10 h-24 w-24 rounded-full bg-rose/25 blur-2xl sm:right-16"
      />
      <SectionShell>
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-[0_25px_80px_rgba(244,166,184,0.25)] backdrop-blur-md sm:p-12">
          <div className="flex items-center gap-2 text-rose">
            <span aria-hidden className="text-2xl">
              💕
            </span>
            <h2 id="message-heading" className="font-display text-2xl text-slate-900 sm:text-3xl">
              A note for you
            </h2>
          </div>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-700 sm:text-lg">
            <p className="animate-fade-up opacity-0 [animation-delay:120ms] [animation-fill-mode:forwards]">
              To my favorite person,
            </p>
            <p className="animate-fade-up opacity-0 [animation-delay:220ms] [animation-fill-mode:forwards]">
              Happy birthday! I made this little website just for you because you deserve something special.
              Thank you for being the sweetest, funniest, and most beautiful part of my life.
            </p>
            <p className="animate-fade-up opacity-0 [animation-delay:320ms] [animation-fill-mode:forwards]">
              I hope this day makes you smile as much as you make me smile every day.
            </p>
            <p className="animate-fade-up pt-2 font-semibold text-slate-800 opacity-0 [animation-delay:420ms] [animation-fill-mode:forwards]">
              Love,
              <br />
              Me
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" aria-hidden>
            {["You", "Me", "Forever"].map((word) => (
              <span
                key={word}
                className="rounded-full bg-gradient-to-r from-rose/20 to-peach/30 px-4 py-1 text-sm font-semibold text-rose"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
});
