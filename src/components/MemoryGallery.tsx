import { SectionShell } from "./ui/SectionShell";

const memories = [
  { caption: "Our favorite memory", alt: "Placeholder for our favorite memory photo" },
  { caption: "The day you made me smile", alt: "Placeholder for a smiling day photo" },
  { caption: "A moment I’ll never forget", alt: "Placeholder for an unforgettable moment photo" },
] as const;

export function MemoryGallery() {
  return (
    <section aria-labelledby="gallery-heading" className="bg-gradient-to-b from-lilac/25 via-cream to-peach/20 py-16 sm:py-20">
      <SectionShell>
        <div className="mb-10 text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose">Little snapshots</p>
          <h2 id="gallery-heading" className="mt-2 font-display text-3xl text-slate-900 sm:text-4xl">
            Our memory lane
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600 sm:mx-0">
            Drop your real photos in later — for now, imagine your sweetest moments glowing here.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((m) => (
            <figure
              key={m.caption}
              className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/60 shadow-lg shadow-rose/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-rose/30 via-lilac/30 to-peach/40"
                role="img"
                aria-label={m.alt}
              >
                <div className="absolute inset-0 opacity-40 mix-blend-multiply">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,white,transparent_55%),radial-gradient(circle_at_80%_0%,#f9a8d4,transparent_45%)]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
                    Photo soon
                  </span>
                </div>
              </div>
              <figcaption className="px-5 py-4 text-center text-sm font-semibold text-slate-800 sm:text-base">
                {m.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionShell>
    </section>
  );
}
