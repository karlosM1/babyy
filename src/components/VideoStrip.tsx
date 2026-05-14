import { motion } from "framer-motion";

export type VideoStripProps = {
  /** Video URLs — replace files in `public/videos/` or update `src/constants/assets.ts` */
  sources: readonly string[];
  rotation?: number;
  className?: string;
  index: number;
};

export function VideoStrip({ sources, rotation = 0, className = "", index }: VideoStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 64, scale: 0.9, rotate: rotation * 0.4 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: rotation }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{
        duration: 0.78,
        delay: Math.min(index * 0.1, 0.5),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex w-[min(100%,13.5rem)] shrink-0 flex-col gap-2.5 rounded-md bg-gradient-to-b from-[#ff6b3d] via-[#ff4520] to-[#c91818] p-2.5 shadow-[0_18px_40px_-12px_rgba(185,28,28,0.55)] ring-1 ring-black/10 ${className}`}
    >
      {sources.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative aspect-[3/4] overflow-hidden rounded-sm bg-black/90 shadow-inner ring-1 ring-black/20"
        >
          {/* CUSTOMIZE: set poster, swap src, or add multiple <source> children for formats */}
          <video
            className="h-full w-full object-cover"
            src={src}
            muted
            loop
            playsInline
            controls
            preload="metadata"
          />
        </div>
      ))}
    </motion.div>
  );
}
