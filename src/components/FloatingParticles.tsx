import { useMemo } from "react";

interface Particle {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
}

const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      delay: `${Math.random() * 8}s`,
      duration: `${8 + Math.random() * 12}s`,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary animate-float"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.5,
            boxShadow: `0 0 ${p.size * 4}px hsl(var(--cosmic-gold) / 0.7)`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
