"use client";

interface PlantIconProps {
  className?: string;
}

export function LeafBorder({ className = "" }: PlantIconProps) {
  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Flowing vine */}
      <path
        d="M0 30 Q25 10, 50 30 T100 30 T150 30 T200 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />
      {/* Leaves along the vine */}
      <g opacity="0.25" fill="currentColor">
        <ellipse cx="25" cy="22" rx="8" ry="4" transform="rotate(-30 25 22)" />
        <ellipse cx="50" cy="32" rx="7" ry="3.5" transform="rotate(20 50 32)" />
        <ellipse cx="80" cy="24" rx="9" ry="4" transform="rotate(-25 80 24)" />
        <ellipse cx="110" cy="33" rx="7" ry="3.5" transform="rotate(15 110 33)" />
        <ellipse cx="140" cy="23" rx="8" ry="4" transform="rotate(-20 140 23)" />
        <ellipse cx="170" cy="32" rx="7" ry="3.5" transform="rotate(25 170 32)" />
      </g>
    </svg>
  );
}

export function HangingPlant({ className = "" }: PlantIconProps) {
  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pot/basket */}
      <path
        d="M25 15 L55 15 L50 30 L30 30 Z"
        fill="currentColor"
        opacity="0.2"
      />
      {/* Hanging strings */}
      <line x1="30" y1="15" x2="40" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="50" y1="15" x2="40" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Trailing vines */}
      <path
        d="M32 30 Q25 50, 20 70 Q18 80, 15 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
      />
      <path
        d="M40 30 Q42 55, 38 75 Q36 85, 40 95"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
      />
      <path
        d="M48 30 Q55 50, 58 70 Q60 80, 63 90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
      />
      {/* Small leaves on vines */}
      <g opacity="0.2" fill="currentColor">
        <ellipse cx="22" cy="55" rx="5" ry="3" transform="rotate(-40 22 55)" />
        <ellipse cx="17" cy="78" rx="5" ry="3" transform="rotate(-30 17 78)" />
        <ellipse cx="41" cy="60" rx="5" ry="3" transform="rotate(10 41 60)" />
        <ellipse cx="37" cy="82" rx="5" ry="3" transform="rotate(-15 37 82)" />
        <ellipse cx="54" cy="56" rx="5" ry="3" transform="rotate(35 54 56)" />
        <ellipse cx="60" cy="77" rx="5" ry="3" transform="rotate(25 60 77)" />
      </g>
    </svg>
  );
}

export function SmallLeaf({ className = "" }: PlantIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="currentColor"
    >
      <path
        d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"
        opacity="0.6"
      />
    </svg>
  );
}

export function CornerVine({ className = "" }: PlantIconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 120 Q10 80, 30 60 Q50 40, 80 30 Q100 22, 120 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.15"
      />
      <path
        d="M0 100 Q15 70, 40 50 Q60 35, 90 25 Q105 20, 120 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.1"
      />
      <g opacity="0.12" fill="currentColor">
        <ellipse cx="20" cy="75" rx="10" ry="5" transform="rotate(-50 20 75)" />
        <ellipse cx="45" cy="50" rx="9" ry="4.5" transform="rotate(-35 45 50)" />
        <ellipse cx="72" cy="34" rx="8" ry="4" transform="rotate(-20 72 34)" />
        <ellipse cx="100" cy="24" rx="9" ry="4.5" transform="rotate(-10 100 24)" />
        <ellipse cx="30" cy="62" rx="7" ry="3.5" transform="rotate(30 30 62)" />
        <ellipse cx="58" cy="40" rx="8" ry="4" transform="rotate(25 58 40)" />
      </g>
    </svg>
  );
}
