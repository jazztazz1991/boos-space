"use client";

import type { EntryDTO } from "@/domain/entry";
import { isToday } from "@/lib/utils";

interface CalendarDayProps {
  day: number;
  year: number;
  month: number;
  entry?: EntryDTO;
  isCelebrating?: boolean;
  celebrationType?: "good" | "selfCare";
  onClick: (day: number) => void;
}

export function CalendarDay({ day, year, month, entry, isCelebrating, celebrationType, onClick }: CalendarDayProps) {
  const today = isToday(year, month, day);

  const getStatusIcon = () => {
    if (!entry) return "🌱";
    switch (entry.dayType) {
      case "GOOD": return "🌿";
      case "TOUGH": return "🥀";
      case "SELF_CARE": return "🌸";
    }
  };

  const getStatusLabel = () => {
    if (!entry) return "Not logged";
    switch (entry.dayType) {
      case "GOOD": return "Good day";
      case "TOUGH": return "Tough day";
      case "SELF_CARE": return "Self care day";
    }
  };

  const getBgClasses = () => {
    if (!entry) {
      return "bg-cream-50 hover:bg-cream-100";
    }
    switch (entry.dayType) {
      case "GOOD": return "bg-moss-50 hover:bg-moss-100";
      case "TOUGH": return "bg-rose-50 hover:bg-rose-100";
      case "SELF_CARE": return "bg-orchid-50 hover:bg-orchid-100";
    }
  };

  const getBorderClasses = () => {
    if (today) {
      return "ring-2 ring-sage-400 ring-offset-2 ring-offset-cream-50";
    }
    return "border border-sage-100";
  };

  const getCelebrationClass = () => {
    if (!isCelebrating) return "";
    return celebrationType === "selfCare" ? "animate-orchid-bloom" : "animate-bloom";
  };

  const isSelfCare = entry?.dayType === "SELF_CARE";

  return (
    <button
      type="button"
      onClick={() => onClick(day)}
      className={`
        relative group rounded-lg sm:rounded-xl p-1 sm:p-2 min-h-14 sm:min-h-20
        flex flex-col items-center justify-between
        transition-all duration-200 cursor-pointer
        plant-card ${getBgClasses()} ${getBorderClasses()}
        ${getCelebrationClass()}
        ${isSelfCare ? "self-care-cell animate-self-care-breath" : ""}
        focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2
      `}
      aria-label={`${getStatusLabel()} - ${day}`}
    >
      {/* Day number */}
      <span
        className={`
          text-xs sm:text-sm font-semibold leading-none
          ${today ? "text-sage-700" : "text-sage-600"}
        `}
      >
        {day}
      </span>

      {/* Status icon */}
      <span
        className={`text-base sm:text-xl leading-none mt-1 ${isSelfCare ? "animate-gentle-float" : ""}`}
        role="img"
        aria-label={getStatusLabel()}
      >
        {getStatusIcon()}
      </span>

      {/* Notes indicator */}
      {entry?.notes && (
        <span
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-bark-400"
          title="Has notes"
          aria-label="Has notes"
        />
      )}

      {/* Hover hint */}
      <span className="
        absolute -bottom-1 left-1/2 -translate-x-1/2
        text-[10px] text-sage-500 opacity-0 group-hover:opacity-100
        transition-opacity whitespace-nowrap
      ">
        click to log
      </span>
    </button>
  );
}
