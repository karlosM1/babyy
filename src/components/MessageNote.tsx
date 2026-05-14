import { useReducedMotion } from "framer-motion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FINAL_LOVE_NOTE } from "../constants/messages";
import { Sticker } from "./Sticker";
import { TypingText } from "./TypingText";

export function MessageNote() {
  const reduceMotion = useReducedMotion();
  const instant = Boolean(reduceMotion);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section className="relative overflow-x-hidden px-4 py-20 sm:px-8 sm:py-24">
      <div className="pointer-events-none absolute left-[6%] top-[10%]">
        <Sticker kind="stars" delay={0} />
      </div>
      <div className="pointer-events-none absolute right-[8%] top-[6%]">
        <Sticker kind="balloon" delay={0.1} />
      </div>
      <div className="pointer-events-none absolute bottom-[12%] left-[10%] hidden sm:block">
        <Sticker kind="cake" delay={0.15} />
      </div>

      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 28, rotate: -1.5 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.8 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] mx-auto max-w-xl rounded-3xl border border-orange-100/80 bg-[#fffdf8] px-8 py-10 shadow-[0_22px_60px_-24px_rgba(120,53,15,0.35)] ring-1 ring-orange-200/40 sm:px-12 sm:py-12"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 top-6 h-16 w-16 rotate-6 rounded-sm bg-gradient-to-br from-rose-200/80 to-orange-200/70 opacity-80 shadow-md"
        />
        <TypingText
          as="div"
          text={FINAL_LOVE_NOTE}
          instant={instant}
          active={inView}
          speed={instant ? 0 : 12}
          className="relative z-[1] text-left font-handwriting text-xl leading-relaxed text-slate-800 sm:text-2xl"
        />
      </motion.article>
    </section>
  );
}
