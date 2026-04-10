"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  startX: number;
  startY: number;
  driftX: number;
  driftY: number;
  delay: number;
  duration: number;
  size: number;
  colorIndex: number;
  rotation: number;
}

interface DriftPetal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  colorIndex: number;
}

interface Sparkle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

interface PetalShowerProps {
  isActive: boolean;
  onComplete: () => void;
}

function generateBurstPetals(): Petal[] {
  const petals: Petal[] = [];
  const count = 15;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    petals.push({
      id: i,
      startX: 50,
      startY: 45,
      driftX: Math.cos(angle) * (15 + Math.random() * 25),
      driftY: Math.sin(angle) * (10 + Math.random() * 15),
      delay: Math.random() * 0.5,
      duration: 2.5 + Math.random() * 1,
      size: 14 + Math.random() * 10,
      colorIndex: Math.floor(Math.random() * 3),
      rotation: Math.random() * 360,
    });
  }

  return petals;
}

function generateDriftPetals(): DriftPetal[] {
  const petals: DriftPetal[] = [];
  const count = 12;

  for (let i = 0; i < count; i++) {
    petals.push({
      id: i,
      left: 5 + Math.random() * 90,
      delay: 1.5 + Math.random() * 1.5,
      duration: 3 + Math.random() * 1,
      size: 10 + Math.random() * 8,
      colorIndex: Math.floor(Math.random() * 3),
    });
  }

  return petals;
}

function generateSparkles(): Sparkle[] {
  const sparkles: Sparkle[] = [];

  // First wave — immediate
  for (let i = 0; i < 10; i++) {
    sparkles.push({
      id: i,
      left: 20 + Math.random() * 60,
      top: 15 + Math.random() * 60,
      delay: 0.2 + Math.random() * 0.8,
      duration: 1.5 + Math.random() * 1,
      size: 8 + Math.random() * 12,
    });
  }

  // Second wave — delayed, keeps twinkling after burst fades
  for (let i = 0; i < 8; i++) {
    sparkles.push({
      id: 10 + i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 70,
      delay: 2 + Math.random() * 1.5,
      duration: 1.5 + Math.random() * 1.5,
      size: 6 + Math.random() * 10,
    });
  }

  return sparkles;
}

const PETAL_COLORS = [
  { fill: "#d1c0ea", stroke: "#b89bdb" }, // lavender
  { fill: "#f5cece", stroke: "#ecabab" }, // pink
  { fill: "#f9f0d4", stroke: "#ebd48e" }, // soft gold
];

export function PetalShower({ isActive, onComplete }: PetalShowerProps) {
  const [burstPetals, setBurstPetals] = useState<Petal[]>([]);
  const [driftPetals, setDriftPetals] = useState<DriftPetal[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    if (isActive) {
      setBurstPetals(generateBurstPetals());
      setDriftPetals(generateDriftPetals());
      setSparkles(generateSparkles());
      setShowGlow(true);

      const timer = setTimeout(() => {
        onComplete();
        setBurstPetals([]);
        setDriftPetals([]);
        setSparkles([]);
        setShowGlow(false);
      }, 7000);

      return () => clearTimeout(timer);
    } else {
      setBurstPetals([]);
      setDriftPetals([]);
      setSparkles([]);
      setShowGlow(false);
    }
  }, [isActive, onComplete]);

  if (!isActive || (burstPetals.length === 0 && driftPetals.length === 0 && sparkles.length === 0)) return null;

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      data-testid="petal-shower"
      aria-hidden="true"
    >
      {/* Center glow ring */}
      {showGlow && (
        <div
          className="absolute animate-glow-pulse"
          data-testid="glow-ring"
          style={{
            left: "50%",
            top: "45%",
            width: "40vmin",
            height: "40vmin",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(209, 192, 234, 0.4) 0%, rgba(155, 127, 196, 0.15) 50%, transparent 70%)",
            animationDelay: "0.1s",
          }}
        />
      )}

      {/* Burst petals — radial explosion from center */}
      {burstPetals.map((petal) => {
        const color = PETAL_COLORS[petal.colorIndex];
        return (
          <div
            key={`burst-${petal.id}`}
            className="absolute animate-petal-burst"
            style={{
              left: `${petal.startX}%`,
              top: `${petal.startY}%`,
              "--petal-x": `${petal.driftX}vw`,
              "--petal-y": `${petal.driftY}vh`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              opacity: 0,
            } as React.CSSProperties}
          >
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: `rotate(${petal.rotation}deg)` }}
            >
              <ellipse cx="12" cy="6" rx="4" ry="6" fill={color.fill} opacity="0.85" />
              <ellipse cx="12" cy="6" rx="4" ry="6" fill={color.fill} opacity="0.85" transform="rotate(72 12 12)" />
              <ellipse cx="12" cy="6" rx="4" ry="6" fill={color.fill} opacity="0.85" transform="rotate(144 12 12)" />
              <ellipse cx="12" cy="6" rx="4" ry="6" fill={color.fill} opacity="0.85" transform="rotate(216 12 12)" />
              <ellipse cx="12" cy="6" rx="4" ry="6" fill={color.fill} opacity="0.85" transform="rotate(288 12 12)" />
              <circle cx="12" cy="12" r="3" fill={color.stroke} opacity="0.6" />
            </svg>
          </div>
        );
      })}

      {/* Drift petals — gentle rain after the burst */}
      {driftPetals.map((petal) => {
        const color = PETAL_COLORS[petal.colorIndex];
        return (
          <div
            key={`drift-${petal.id}`}
            className="absolute animate-petal-drift"
            style={{
              left: `${petal.left}%`,
              top: "-20px",
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              opacity: 0,
            }}
          >
            <svg
              width={petal.size}
              height={petal.size * 1.4}
              viewBox="0 0 20 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Single petal teardrop shape */}
              <path
                d="M10 2 Q16 8, 15 16 Q14 24, 10 26 Q6 24, 5 16 Q4 8, 10 2Z"
                fill={color.fill}
                opacity="0.75"
              />
              <path
                d="M10 6 Q10 16, 10 22"
                stroke={color.stroke}
                strokeWidth="0.6"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
        );
      })}

      {/* Sparkles — two waves of twinkling stars */}
      {sparkles.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="absolute animate-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            opacity: 0,
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
              fill="#ebd48e"
              opacity="0.9"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
