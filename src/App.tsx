import { useCallback, useRef } from "react";
import { BirthdayHero } from "./components/BirthdayHero";
import { BirthdayMessage } from "./components/BirthdayMessage";
import { ConfettiOverlay } from "./components/ConfettiOverlay";
import { FinalSurprise } from "./components/FinalSurprise";
import { MemoryGallery } from "./components/MemoryGallery";
import { useConfetti } from "./hooks/useConfetti";

export default function App() {
  const messageRef = useRef<HTMLElement>(null);
  const { pieces, burst, replay, key } = useConfetti(56);

  const scrollToMessage = useCallback(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleCakeMagic = useCallback(() => {
    burst(40);
  }, [burst]);

  const handleCelebrateAgain = useCallback(() => {
    replay();
  }, [replay]);

  return (
    <div className="relative min-h-screen bg-cream">
      <a
        href="#message-heading"
        className="pointer-events-auto absolute left-4 top-4 z-[80] -translate-y-24 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-rose shadow focus:translate-y-0 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-rose"
      >
        Skip to message
      </a>
      <ConfettiOverlay pieces={pieces} layerKey={key} />
      <main>
        <BirthdayHero onOpenSurprise={scrollToMessage} onCakeMagic={handleCakeMagic} />
        <BirthdayMessage ref={messageRef} />
        <MemoryGallery />
        <FinalSurprise onCelebrateAgain={handleCelebrateAgain} />
      </main>
      <footer className="bg-gradient-to-r from-rose/15 to-lilac/20 py-8 text-center text-sm text-slate-600">
        Made with love — happy birthday.
      </footer>
    </div>
  );
}
