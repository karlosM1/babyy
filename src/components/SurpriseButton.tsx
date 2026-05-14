import { motion } from "framer-motion";

type SurpriseButtonProps = {
  onClick: () => void;
  visible: boolean;
};

export function SurpriseButton({ onClick, visible }: SurpriseButtonProps) {
  if (!visible) return null;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{ scale: 1.05, boxShadow: "0 18px 40px rgba(234, 88, 12, 0.35)" }}
      whileTap={{ scale: 0.97 }}
      className="group relative mt-10 inline-flex min-h-[52px] min-w-[min(100%,280px)] items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#ff6b3d] via-[#ff4d2e] to-[#e11d48] px-10 py-3.5 text-base font-semibold text-white shadow-lg shadow-orange-500/30 ring-2 ring-white/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e11d48]"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-y-full bg-white/25 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
      />
      <span className="relative z-[1] tracking-wide">Click to open my surprise</span>
    </motion.button>
  );
}
