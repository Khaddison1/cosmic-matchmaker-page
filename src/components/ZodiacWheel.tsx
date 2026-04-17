// Text-presentation variation selector (U+FE0E) forces glyph (not emoji) rendering
const VS = "\uFE0E";
const ZODIAC_SIGNS = [
  { name: "Aries", glyph: "\u2648" + VS, date: "Mar 21" },
  { name: "Taurus", glyph: "\u2649" + VS, date: "Apr 20" },
  { name: "Gemini", glyph: "\u264A" + VS, date: "May 21" },
  { name: "Cancer", glyph: "\u264B" + VS, date: "Jun 21" },
  { name: "Leo", glyph: "\u264C" + VS, date: "Jul 23" },
  { name: "Virgo", glyph: "\u264D" + VS, date: "Aug 23" },
  { name: "Libra", glyph: "\u264E" + VS, date: "Sep 23" },
  { name: "Scorpio", glyph: "\u264F" + VS, date: "Oct 23" },
  { name: "Sagittarius", glyph: "\u2650" + VS, date: "Nov 22" },
  { name: "Capricorn", glyph: "\u2651" + VS, date: "Dec 22" },
  { name: "Aquarius", glyph: "\u2652" + VS, date: "Jan 20" },
  { name: "Pisces", glyph: "\u2653" + VS, date: "Feb 19" },
];

const ZodiacWheel = () => {
  const size = 520;
  const cx = size / 2;
  const cy = size / 2;

  // Radii (from outer to inner)
  const rOuter = 252;
  const rTickOuter = 248;
  const rTickInner = 228;
  const rGlyphRing = 210; // where glyphs sit
  const rDivider = 188;
  const rInnerRing = 150;
  const rInnerStars = 110;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-glow-pulse" />

      {/* Rotating wheel (slow) */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          <defs>
            <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="hsl(43 78% 62% / 0)" />
              <stop offset="100%" stopColor="hsl(43 78% 62% / 0.55)" />
            </radialGradient>
            <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(45 95% 80%)" />
              <stop offset="50%" stopColor="hsl(43 85% 65%)" />
              <stop offset="100%" stopColor="hsl(38 70% 50%)" />
            </linearGradient>
            <filter id="glyphGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer rings */}
          <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="url(#wheelGlow)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r={rOuter - 4} fill="none" stroke="hsl(43 78% 62% / 0.35)" strokeWidth="0.8" />
          <circle
            cx={cx}
            cy={cy}
            r={rDivider}
            fill="none"
            stroke="hsl(43 78% 62% / 0.25)"
            strokeWidth="0.6"
            strokeDasharray="2 5"
          />
          <circle cx={cx} cy={cy} r={rInnerRing} fill="none" stroke="hsl(43 78% 62% / 0.3)" strokeWidth="0.6" />

          {/* 12 sector dividers + glyphs */}
          {ZODIAC_SIGNS.map((sign, i) => {
            // Glyph centered in each 30° sector. Sector i spans angle [i*30, (i+1)*30].
            // Place glyph at sector midpoint, starting from top (-90°).
            const midDeg = i * 30 - 90 + 15;
            const midRad = (midDeg * Math.PI) / 180;

            // Sector boundary line at i*30 - 90
            const boundaryDeg = i * 30 - 90;
            const boundaryRad = (boundaryDeg * Math.PI) / 180;

            const bx1 = cx + Math.cos(boundaryRad) * rDivider;
            const by1 = cy + Math.sin(boundaryRad) * rDivider;
            const bx2 = cx + Math.cos(boundaryRad) * rTickOuter;
            const by2 = cy + Math.sin(boundaryRad) * rTickOuter;

            // Tick marks within sector (every 10°)
            const ticks = [10, 20].map((offset) => {
              const tDeg = boundaryDeg + offset;
              const tRad = (tDeg * Math.PI) / 180;
              const tx1 = cx + Math.cos(tRad) * rTickInner;
              const ty1 = cy + Math.sin(tRad) * rTickInner;
              const tx2 = cx + Math.cos(tRad) * (rTickInner + 8);
              const ty2 = cy + Math.sin(tRad) * (rTickInner + 8);
              return (
                <line
                  key={`tick-${i}-${offset}`}
                  x1={tx1}
                  y1={ty1}
                  x2={tx2}
                  y2={ty2}
                  stroke="hsl(43 78% 62% / 0.45)"
                  strokeWidth="0.6"
                />
              );
            });

            const gx = cx + Math.cos(midRad) * rGlyphRing;
            const gy = cy + Math.sin(midRad) * rGlyphRing;

            return (
              <g key={sign.name}>
                <line
                  x1={bx1}
                  y1={by1}
                  x2={bx2}
                  y2={by2}
                  stroke="url(#goldStroke)"
                  strokeWidth="1"
                  opacity="0.7"
                />
                {ticks}
                <text
                  x={gx}
                  y={gy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="hsl(45 95% 78%)"
                  fontSize="24"
                  fontFamily="'Noto Sans Symbols 2', 'Noto Sans Symbols', 'DejaVu Sans', 'Segoe UI Symbol', serif"
                  fontWeight="400"
                  filter="url(#glyphGlow)"
                  style={{ fontVariantEmoji: "text" } as React.CSSProperties}
                >
                  {sign.glyph}
                </text>
              </g>
            );
          })}

          {/* Inner constellation dots */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = ((i * 30 - 90 + 15) * Math.PI) / 180;
            const x = cx + Math.cos(a) * rInnerStars;
            const y = cy + Math.sin(a) * rInnerStars;
            return (
              <circle
                key={`dot-${i}`}
                cx={x}
                cy={y}
                r="1.5"
                fill="hsl(50 100% 88%)"
                opacity="0.7"
              />
            );
          })}

          {/* Inner connecting hexagram-like lines */}
          <g opacity="0.25" stroke="url(#goldStroke)" strokeWidth="0.5" fill="none">
            {Array.from({ length: 6 }).map((_, i) => {
              const a1 = ((i * 60 - 90) * Math.PI) / 180;
              const a2 = ((i * 60 + 120 - 90) * Math.PI) / 180;
              const x1 = cx + Math.cos(a1) * rInnerStars;
              const y1 = cy + Math.sin(a1) * rInnerStars;
              const x2 = cx + Math.cos(a2) * rInnerStars;
              const y2 = cy + Math.sin(a2) * rInnerStars;
              return <line key={`hex-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
        </svg>
      </div>

      {/* Center sigil (static) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl animate-glow-pulse" />
          <div className="relative h-20 w-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
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
