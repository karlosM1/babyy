import { useEffect, useRef, useState } from "react";

type TypingTextProps = {
  text: string;
  /** Milliseconds between characters */
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
  active?: boolean;
  /** When true, show full text immediately */
  instant?: boolean;
  as?: "p" | "div" | "span" | "h1" | "h2";
};

export function TypingText({
  text,
  speed = 38,
  className = "",
  onComplete,
  startDelay = 0,
  active = true,
  instant = false,
  as: Tag = "p",
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState(() => (instant ? text : ""));
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!active) return;

    if (instant) {
      setDisplayed(text);
      onCompleteRef.current?.();
      return;
    }

    setDisplayed("");
    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        charIndex += 1;
        setDisplayed(text.slice(0, charIndex));
        if (charIndex >= text.length) {
          if (intervalId) window.clearInterval(intervalId);
          onCompleteRef.current?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay, active, instant]);

  return (
    <Tag className={`whitespace-pre-line ${className}`}>
      {displayed}
      {!instant && active && displayed.length < text.length ? (
        <span className="typing-caret ml-0.5 inline-block align-[-0.1em] font-sans" aria-hidden>
          |
        </span>
      ) : null}
    </Tag>
  );
}
