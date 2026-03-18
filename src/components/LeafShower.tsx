"use client";

import { useEffect, useState } from "react";

interface FallingLeaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  hue: number;
}

interface LeafShowerProps {
  isActive: boolean;
  onComplete: () => void;
}

function generateLeaves(): FallingLeaf[] {
  const leaves: FallingLeaf[] = [];
  const count = 12;

  for (let i = 0; i < count; i++) {
    leaves.push({
      id: i,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 0.8,
      duration: 2.5 + Math.random() * 1.5,
      size: 16 + Math.random() * 14,
      // Vary between green hues: sage, moss, and a touch of gold
      hue: Math.floor(Math.random() * 3),
    });
  }

  return leaves;
}

const LEAF_COLORS = [
  { body: "#94a67e", vein: "#7a8f64" }, // sage
  { body: "#6d966d", vein: "#527a52" }, // moss
  { body: "#c4b567", vein: "#a89a4a" }, // gold
];

export function LeafShower({ isActive, onComplete }: LeafShowerProps) {
  const [leaves, setLeaves] = useState<FallingLeaf[]>([]);

  useEffect(() => {
    if (isActive) {
      setLeaves(generateLeaves());

      const timer = setTimeout(() => {
        onComplete();
        setLeaves([]);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setLeaves([]);
    }
  }, [isActive, onComplete]);

  if (!isActive || leaves.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      data-testid="leaf-shower"
      aria-hidden="true"
    >
      {leaves.map((leaf) => {
        const color = LEAF_COLORS[leaf.hue];
        return (
          <div
            key={leaf.id}
            className="absolute animate-leaf-fall"
            style={{
              left: `${leaf.left}%`,
              top: "-30px",
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
              opacity: 0,
            }}
          >
            <svg
              width={leaf.size}
              height={leaf.size * 1.4}
              viewBox="0 0 20 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1 Q17 7, 17 15 Q17 23, 10 27 Q3 23, 3 15 Q3 7, 10 1Z"
                fill={color.body}
                opacity="0.8"
              />
              <line
                x1="10" y1="3" x2="10" y2="25"
                stroke={color.vein}
                strokeWidth="0.7"
                opacity="0.6"
              />
              <line x1="10" y1="9" x2="6" y2="13" stroke={color.vein} strokeWidth="0.5" opacity="0.4" />
              <line x1="10" y1="9" x2="14" y2="13" stroke={color.vein} strokeWidth="0.5" opacity="0.4" />
              <line x1="10" y1="15" x2="5" y2="19" stroke={color.vein} strokeWidth="0.5" opacity="0.4" />
              <line x1="10" y1="15" x2="15" y2="19" stroke={color.vein} strokeWidth="0.5" opacity="0.4" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
