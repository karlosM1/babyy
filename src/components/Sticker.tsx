import { motion } from "framer-motion";

export type StickerKind = "cake" | "camera" | "balloon" | "stars";

const EMOJI: Record<StickerKind, string> = {
  cake: "🎂",
  camera: "📷",
  balloon: "🎈",
  stars: "✨",
};

type StickerProps = {
  kind: StickerKind;
  className?: string;
  /** Stagger entrance with other stickers */
  delay?: number;
};

export function Sticker({ kind, className = "", delay = 0 }: StickerProps) {
  return (
    <motion.span
      aria-hidden
      className={`pointer-events-none inline-block select-none text-2xl drop-shadow-md sm:text-3xl ${className}`}
      initial={{ opacity: 0, scale: 0.45, rotate: -18 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ type: "spring", stiffness: 380, damping: 18, delay }}
    >
      <motion.span
        className="inline-block"
        animate={{ y: [0, -6, 0], rotate: [0, 5, -4, 0] }}
        transition={{
          duration: 4.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {EMOJI[kind]}
      </motion.span>
    </motion.span>
  );
}
