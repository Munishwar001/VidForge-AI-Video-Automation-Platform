import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";

type RevealVariant = "up" | "scale" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
}

const HIDDEN_TRANSFORM: Record<RevealVariant, string> = {
  up: "translateY(28px)",
  scale: "scale(0.94)",
  left: "translateX(-32px)",
  right: "translateX(32px)",
};

export default function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 700,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : HIDDEN_TRANSFORM[variant],
        transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
