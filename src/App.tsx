import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GreetingIntro } from "./components/GreetingIntro";
import { MessageNote } from "./components/MessageNote";
import { PhotoboothSection, type PhotoStripConfig } from "./components/PhotoboothSection";
import { VideoStrip } from "./components/VideoStrip";
import { PHOTOS, VIDEOS } from "./constants/assets";

const MAIN_STRIPS: readonly PhotoStripConfig[] = [
  { images: [PHOTOS[0], PHOTOS[1]], rotation: -5 },
  { images: [PHOTOS[2], PHOTOS[3]], rotation: 3 },
  { images: [PHOTOS[4], PHOTOS[5]], rotation: 6 },
  { images: [PHOTOS[6], PHOTOS[7]], rotation: -3 },
];

const FAVORITE_STRIPS: readonly PhotoStripConfig[] = [
  { images: [PHOTOS[8], PHOTOS[9]], rotation: 4 },
  { images: [PHOTOS[10], PHOTOS[11]], rotation: -6 },
  { images: [PHOTOS[12], PHOTOS[13], PHOTOS[14]], rotation: 2 },
];

const VIDEO_ROTATIONS = [-4, 5, -2, 3] as const;

export default function App() {
  const [surpriseOpen, setSurpriseOpen] = useState(false);

  useEffect(() => {
    if (!surpriseOpen) return;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [surpriseOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fff9f3] text-slate-900">
      <a
        href="#surprise-main"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-orange-700 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Skip to photobooth
      </a>

      <AnimatePresence mode="wait">
        {!surpriseOpen ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          >
            <GreetingIntro onOpenSurprise={() => setSurpriseOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="surprise"
            id="surprise-main"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <main>
              <PhotoboothSection
                eyebrow="For you, always"
                title="HAPPY BIRTHDAY"
                titleLine2="PHOTOBOOTH"
                strips={MAIN_STRIPS}
              />

              <PhotoboothSection
                eyebrow="Forever team us"
                title="MY FAVORITE"
                titleLine2="PERSON!"
                strips={FAVORITE_STRIPS}
              />

              <section className="relative overflow-x-hidden px-4 py-16 sm:px-8 sm:py-20">
                <div className="mx-auto max-w-6xl text-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.55 }}
                    className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
                  >
                    <span className="bg-gradient-to-r from-[#ff4d2e] to-[#e11d48] bg-clip-text text-transparent">
                      OUR LITTLE
                    </span>
                    <br />
                    MOMENTS
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06, duration: 0.45 }}
                    className="mx-auto mt-4 max-w-lg font-sans text-sm text-slate-600 sm:text-base"
                  >
                    Tap play on each clip — these are your moments.
                  </motion.p>
                </div>

                <div className="mx-auto mt-14 flex max-w-6xl flex-wrap items-start justify-center gap-10 md:gap-16">
                  {VIDEOS.map((src, index) => (
                    <VideoStrip
                      key={src}
                      sources={[src]}
                      rotation={VIDEO_ROTATIONS[index % VIDEO_ROTATIONS.length]}
                      index={index}
                    />
                  ))}
                </div>
              </section>

              <MessageNote />
            </main>

            <footer className="pb-10 pt-4 text-center font-sans text-xs text-slate-500 sm:text-sm">
              Made with love — happy birthday, babyyy.
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
