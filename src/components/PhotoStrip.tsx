import { motion } from "framer-motion";

export type PhotoStripProps = {
  /** Image URLs — replace files in `public/images/` or change `src/constants/assets.ts` */
  images: readonly string[];
  /** Playful tilt in degrees */
  rotation?: number;
  className?: string;
  /** Stagger scroll animation with sibling strips */
  index: number;
};

export function PhotoStrip({ images, rotation = 0, className = "", index }: PhotoStripProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 56, scale: 0.9, rotate: rotation * 0.35 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: rotation }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{
        duration: 0.72,
        delay: Math.min(index * 0.09, 0.45),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative flex w-[min(100%,13.5rem)] shrink-0 flex-col gap-2.5 rounded-md bg-gradient-to-b from-[#ff6b3d] via-[#ff4520] to-[#c91818] p-2.5 shadow-[0_18px_40px_-12px_rgba(185,28,28,0.55)] ring-1 ring-black/10 ${className}`}
    >
      <div className="pointer-events-none absolute -right-1 -top-1 h-6 w-6 rounded-full bg-white/35 blur-[2px]" />
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white/95 shadow-inner shadow-black/10 ring-1 ring-black/5"
        >
          <img
            src={src}
            alt={`Photobooth memory ${i + 1}`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </motion.div>
  );
}
