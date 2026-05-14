import { motion } from "framer-motion";
import { PhotoStrip } from "./PhotoStrip";
import { Sticker } from "./Sticker";

export type PhotoStripConfig = {
  images: readonly string[];
  rotation?: number;
};

type PhotoboothSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  titleLine2?: string;
  strips: readonly PhotoStripConfig[];
};

export function PhotoboothSection({
  id,
  eyebrow,
  title,
  titleLine2,
  strips,
}: PhotoboothSectionProps) {
  return (
    <section
      id={id}
      className="relative overflow-x-hidden px-4 py-16 sm:px-8 sm:py-20"
    >
      <div className="pointer-events-none absolute left-[4%] top-[8%] sm:left-[8%]">
        <Sticker kind="balloon" delay={0} />
      </div>
      <div className="pointer-events-none absolute right-[6%] top-[14%] sm:right-[10%]">
        <Sticker kind="cake" delay={0.12} />
      </div>
      <div className="pointer-events-none absolute bottom-[18%] left-[8%] hidden md:block">
        <Sticker kind="camera" delay={0.2} />
      </div>
      <div className="pointer-events-none absolute bottom-[22%] right-[10%]">
        <Sticker kind="stars" delay={0.08} />
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl text-center">
        {eyebrow ? (
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-orange-600/90">
            {eyebrow}
          </p>
        ) : null}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
        >
          {title}
          {titleLine2 ? (
            <>
              <br />
              <span className="bg-gradient-to-r from-[#ff4d2e] to-[#e11d48] bg-clip-text text-transparent">
                {titleLine2}
              </span>
            </>
          ) : null}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="mx-auto mt-4 max-w-xl font-sans text-sm text-slate-600 sm:text-base"
        >
          I love you babyyy, and I hope you enjoy these moments as much as I do.
          Tap play on each strip to see the photos!
        </motion.p>
      </div>

      <div className="relative z-[1] mx-auto mt-14 flex max-w-6xl flex-wrap items-start justify-center gap-10 md:gap-14 lg:gap-16">
        {strips.map((strip, index) => (
          <PhotoStrip
            key={`strip-${index}-${strip.images.join(",")}`}
            images={strip.images}
            rotation={strip.rotation}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
