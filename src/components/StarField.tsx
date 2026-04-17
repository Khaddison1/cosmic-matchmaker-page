import { useMemo } from "react";

interface Star {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  opacity: number;
}

interface StarFieldProps {
  count?: number;
  className?: string;
}

const StarField = ({ count = 120, className = "" }: StarFieldProps) => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.5,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 5}s`,
      opacity: 0.3 + Math.random() * 0.7,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star animate-twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDelay: s.delay,
            animationDuration: s.duration,
            boxShadow: `0 0 ${s.size * 3}px hsl(var(--cosmic-star) / ${s.opacity})`,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
