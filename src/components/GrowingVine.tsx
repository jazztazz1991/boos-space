"use client";

interface GrowingVineProps {
  goodDays: number;
  totalDays: number;
  side: "left" | "right";
}

export function GrowingVine({ goodDays, totalDays, side }: GrowingVineProps) {
  const slotCount = Math.max(totalDays, 1);

  // Generate leaf positions from bottom to top
  const leaves = [];
  for (let i = 0; i < goodDays && i < slotCount; i++) {
    const t = (i + 1) / (slotCount + 1); // 0→1 from bottom to top
    const bottomPercent = t * 100;
    // Alternate leaves to the left/right of the vine stem
    const isInner = i % 2 === 0;
    const offsetX = isInner ? 2 : -6;
    const rotation = isInner
      ? (side === "left" ? -35 : 35)
      : (side === "left" ? 30 : -30);
    // Vary size slightly
    const scale = 0.85 + Math.sin(i * 1.7) * 0.15;

    leaves.push({ bottomPercent, offsetX, rotation, scale, index: i });
  }

  // Bud position for next potential leaf
  const showBud = goodDays < slotCount;
  const budT = (goodDays + 1) / (slotCount + 1);
  const budBottom = budT * 100;

  return (
    <div
      className="hidden lg:block absolute top-0 bottom-0 pointer-events-none"
      style={{
        width: "40px",
        [side]: "-48px",
      }}
      aria-hidden="true"
      data-testid={`growing-vine-${side}`}
    >
      {/* Vine stem — a wavy vertical line */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 40 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={
            side === "left"
              ? "M20 800 Q28 700, 18 600 Q10 500, 24 400 Q32 300, 16 200 Q8 100, 22 0"
              : "M20 800 Q12 700, 22 600 Q30 500, 16 400 Q8 300, 24 200 Q32 100, 18 0"
          }
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-sage-300"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Leaves — positioned via CSS so they don't get distorted */}
      {leaves.map((leaf) => (
        <div
          key={leaf.index}
          className="absolute animate-leaf-grow"
          style={{
            bottom: `${leaf.bottomPercent}%`,
            left: `${50 + leaf.offsetX}%`,
            transform: `translate(-50%, 50%) rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            animationDelay: `${leaf.index * 0.1}s`,
            opacity: 0,
          }}
        >
          <svg
            width="20"
            height="28"
            viewBox="0 0 20 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Leaf body */}
            <path
              d="M10 2 Q16 8, 16 16 Q16 24, 10 26 Q4 24, 4 16 Q4 8, 10 2Z"
              fill="currentColor"
              className="text-moss-400"
              opacity="0.75"
            />
            {/* Center vein */}
            <line
              x1="10" y1="4" x2="10" y2="24"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-moss-600"
              opacity="0.5"
            />
            {/* Side veins */}
            <line x1="10" y1="10" x2="7" y2="13" stroke="currentColor" strokeWidth="0.5" className="text-moss-600" opacity="0.3" />
            <line x1="10" y1="10" x2="13" y2="13" stroke="currentColor" strokeWidth="0.5" className="text-moss-600" opacity="0.3" />
            <line x1="10" y1="16" x2="6" y2="19" stroke="currentColor" strokeWidth="0.5" className="text-moss-600" opacity="0.3" />
            <line x1="10" y1="16" x2="14" y2="19" stroke="currentColor" strokeWidth="0.5" className="text-moss-600" opacity="0.3" />
          </svg>
        </div>
      ))}

      {/* Bud — next spot waiting to bloom */}
      {showBud && (
        <div
          className="absolute"
          style={{
            bottom: `${budBottom}%`,
            left: "50%",
            transform: "translate(-50%, 50%)",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="5" cy="5" r="3.5"
              fill="currentColor"
              className="text-sage-200"
              opacity="0.6"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
