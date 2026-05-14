import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { WAVING_BOY_GIF } from "../constants/assets";
import { SurpriseButton } from "./SurpriseButton";
import { TypingText } from "./TypingText";

type GreetingIntroProps = {
  onOpenSurprise: () => void;
};

const GREETING_LINES = "Hi Babyyy!\nHappy 23th Birthday!";
const SECOND_LINE = "I made this for you";

export function GreetingIntro({ onOpenSurprise }: GreetingIntroProps) {
  const reduceMotion = useReducedMotion();
  const instant = Boolean(reduceMotion);

  const [greetingDone, setGreetingDone] = useState(instant);
  const [gifVisible, setGifVisible] = useState(instant);
  const [showButton, setShowButton] = useState(instant);

  const handleGreetingComplete = useCallback(() => {
    setGreetingDone(true);
    setGifVisible(true);
  }, []);

  const handleSecondComplete = useCallback(() => {
    setShowButton(true);
  }, []);

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(255,213,200,0.55),transparent_42%),radial-gradient(circle_at_80%_10%,rgba(255,182,193,0.45),transparent_38%),linear-gradient(180deg,#fff9f3_0%,#fff4ec_45%,#ffe8e0_100%)] px-6 py-16 text-center">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-24 h-40 w-40 rounded-full bg-orange-200/40 blur-3xl"
        animate={instant ? undefined : { scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-20 h-48 w-48 rounded-full bg-rose-200/45 blur-3xl"
        animate={instant ? undefined : { scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-[1] mx-auto flex max-w-lg flex-col items-center">
        <TypingText
          as="h1"
          text={GREETING_LINES}
          instant={instant}
          className="font-display text-3xl leading-snug text-slate-900 sm:text-4xl"
          speed={40}
          onComplete={handleGreetingComplete}
        />

        {gifVisible ? (
          <motion.div
            initial={instant ? undefined : { opacity: 0, y: 24, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="mt-8"
          >
            {/* CUSTOMIZE: replace `WAVING_BOY_GIF` in `src/constants/assets.ts` or swap the file in `public/gifs/` */}
            <img
              src={WAVING_BOY_GIF}
              alt="Cute waving character"
              className="mx-auto h-36 w-auto max-w-[min(100%,220px)] object-contain drop-shadow-lg sm:h-44"
              width={220}
              height={176}
              loading="eager"
              decoding="async"
            />
          </motion.div>
        ) : null}

        {greetingDone ? (
          <div className="mt-10">
            <TypingText
              text={SECOND_LINE}
              instant={instant}
              startDelay={instant ? 0 : 600}
              active={gifVisible}
              className="font-sans text-lg font-medium text-slate-700 sm:text-xl"
              speed={42}
              onComplete={handleSecondComplete}
            />
          </div>
        ) : null}

        <SurpriseButton visible={showButton} onClick={onOpenSurprise} />
      </div>
    </div>
  );
}
