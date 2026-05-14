import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_VOLUME = 0.38;

type BackgroundMusicProps = {
  src: string;
  /** Track label for the control (visible + screen readers). */
  title: string;
  artist: string;
};

/**
 * Attempts autoplay on load. Most browsers block audible autoplay without a prior
 * user gesture; in that case we start on the first tap/click anywhere (see banner).
 */
export function BackgroundMusic({ src, title, artist }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [awaitingGesture, setAwaitingGesture] = useState(false);

  useEffect(() => {
    if (isPlaying) setAwaitingGesture(false);
  }, [isPlaying]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || loadError) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    const tryPlay = () => {
      el.volume = DEFAULT_VOLUME;
      return el.play();
    };

    const onCanPlayThrough = () => {
      void tryPlay().catch(() => setAwaitingGesture(true));
    };

    if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void tryPlay().catch(() => setAwaitingGesture(true));
    } else {
      el.addEventListener("canplaythrough", onCanPlayThrough, { once: true });
    }

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("canplaythrough", onCanPlayThrough);
    };
  }, [src, loadError]);

  useEffect(() => {
    if (!awaitingGesture || loadError) return;
    const el = audioRef.current;
    if (!el) return;

    const startFromGesture = (event: PointerEvent) => {
      if (
        panelRef.current &&
        event.target instanceof Node &&
        panelRef.current.contains(event.target)
      ) {
        return;
      }
      el.volume = DEFAULT_VOLUME;
      void el.play().catch(() => {});
      setAwaitingGesture(false);
    };

    window.addEventListener("pointerdown", startFromGesture, { capture: true, once: true });
    return () => {
      window.removeEventListener("pointerdown", startFromGesture, { capture: true });
    };
  }, [awaitingGesture, loadError]);

  const togglePlayback = useCallback(() => {
    const el = audioRef.current;
    if (!el || loadError) return;
    if (el.paused) {
      el.volume = DEFAULT_VOLUME;
      void el.play().catch(() => setIsPlaying(false));
    } else {
      el.pause();
    }
  }, [loadError]);

  const label = loadError ? "Music file missing" : isPlaying ? "Pause music" : "Play music";
  const subline = loadError ? "Add MP3 to public/audio" : `${title} · ${artist}`;

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        playsInline
        autoPlay
        className="hidden"
        onError={() => {
          setLoadError(true);
          setIsPlaying(false);
          setAwaitingGesture(false);
        }}
      />

      {awaitingGesture && !loadError ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none fixed left-1/2 top-4 z-[95] w-[min(92vw,22rem)] -translate-x-1/2 rounded-full border border-orange-200/90 bg-white/95 px-4 py-2.5 text-center font-sans text-xs font-medium text-slate-700 shadow-lg shadow-orange-900/10 backdrop-blur-sm sm:text-sm"
        >
          Tap anywhere to start your song — browsers require a quick hello first ♪
        </motion.div>
      ) : null}

      <motion.div
        ref={panelRef}
        className="pointer-events-auto fixed bottom-4 right-4 z-[90] max-w-[min(100vw-2rem,16rem)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45 }}
      >
        <button
          type="button"
          onClick={togglePlayback}
          disabled={loadError}
          aria-label={label}
          title={subline}
          className="flex w-full flex-col items-stretch gap-0.5 rounded-2xl border border-orange-200/80 bg-white/95 px-4 py-3 text-left shadow-lg shadow-orange-900/10 backdrop-blur-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex items-center gap-2 font-sans text-sm font-semibold text-slate-900">
            <span className="text-lg" aria-hidden>
              {loadError ? "♪" : isPlaying ? "⏸" : "▶"}
            </span>
            {loadError ? "No music file" : isPlaying ? "Pause" : "Play"}
          </span>
          <span className="line-clamp-2 font-sans text-xs leading-snug text-slate-600">{subline}</span>
        </button>
      </motion.div>
    </>
  );
}
