import type { ReactNode } from "react";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function SectionShell({ children, className = "", id }: SectionShellProps) {
  return (
    <div id={id} className={`mx-auto w-full max-w-6xl px-4 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
