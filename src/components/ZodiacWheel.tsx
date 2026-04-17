import zodiacWheel from "@/assets/zodiac-wheel.png";

const ZodiacWheel = () => {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-glow-pulse" />

      {/* Rotating outer ring */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 520 520" className="w-full h-full">
          <defs>
            <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
              <stop offset="80%" stopColor="hsl(43 78% 62% / 0)" />
              <stop offset="100%" stopColor="hsl(43 78% 62% / 0.6)" />
            </radialGradient>
          </defs>
          <circle cx="260" cy="260" r="255" fill="none" stroke="url(#ringGrad)" strokeWidth="1" />
          <circle cx="260" cy="260" r="240" fill="none" stroke="hsl(43 78% 62% / 0.2)" strokeWidth="0.5" strokeDasharray="2 6" />
          {/* tick marks for 12 zodiacs */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 260 + Math.cos(angle) * 230;
            const y1 = 260 + Math.sin(angle) * 230;
            const x2 = 260 + Math.cos(angle) * 250;
            const y2 = 260 + Math.sin(angle) * 250;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(43 78% 62% / 0.5)" strokeWidth="1" />
            );
          })}
        </svg>
      </div>

      {/* Wheel image - slow reverse rotation */}
      <div className="absolute inset-[8%] animate-spin-reverse">
        <img
          src={zodiacWheel}
          alt=""
          width={1024}
          height={1024}
          className="w-full h-full object-contain opacity-80 drop-shadow-[0_0_40px_hsl(43_90%_60%/0.4)]"
          loading="lazy"
        />
      </div>

      {/* Center sigil */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl animate-glow-pulse" />
          <div className="relative h-20 w-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-strong">
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-background" fill="currentColor">
              <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZodiacWheel;
