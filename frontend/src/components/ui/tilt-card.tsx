import { useRef, useState, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export default function TiltCard({ children, className = "", max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * max * 2;
    const rotateX = (0.5 - py) * max * 2;
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
      transition: "transform 0.1s ease-out",
    });
    setSpot({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)",
      transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, "--spot-x": `${spot.x}%`, "--spot-y": `${spot.y}%` } as React.CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
