"use client";

import { useState, useEffect, useRef } from "react";
import type { DayType, EntryDTO } from "@/domain/entry";
import { SmallLeaf } from "./PlantIcon";

interface DayModalProps {
  isOpen: boolean;
  dateKey: string | null;
  entry?: EntryDTO;
  onSave: (dateKey: string, dayType: DayType, notes: string) => void;
  onClose: () => void;
}

const NOTES_PLACEHOLDERS: Record<DayType, string> = {
  GOOD: "How are you feeling? What happened today...",
  TOUGH: "How are you feeling? What happened today...",
  SELF_CARE: "What are you doing to take care of yourself today?",
};

export function DayModal({ isOpen, dateKey, entry, onSave, onClose }: DayModalProps) {
  const [dayType, setDayType] = useState<DayType>("GOOD");
  const [notes, setNotes] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (entry) {
      setDayType(entry.dayType);
      setNotes(entry.notes ?? "");
    } else {
      setDayType("GOOD");
      setNotes("");
    }
  }, [entry, dateKey]);

  useEffect(() => {
    if (isOpen && firstFocusRef.current) {
      firstFocusRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !dateKey) return null;

  const formattedDate = new Date(dateKey + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSave = () => {
    onSave(dateKey, dayType, notes);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Log entry for ${formattedDate}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-sage-900/30 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="
          relative bg-cream-50 rounded-2xl shadow-xl
          w-full max-w-md p-6 animate-fade-in
          border border-sage-100
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4 text-sage-400 hover:text-sage-600
            transition-colors p-1 rounded-lg hover:bg-sage-50
          "
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <SmallLeaf className="w-5 h-5 text-sage-400" />
            <h2 className="font-heading text-xl text-sage-800">
              Garden Log
            </h2>
          </div>
          <p className="text-sage-500 text-sm">{formattedDate}</p>
        </div>

        {/* Status toggle */}
        <div className="mb-6">
          <p className="text-sm font-medium text-sage-700 mb-3">How was today?</p>

          {/* Top row: Good Day / Tough Day */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              ref={firstFocusRef}
              type="button"
              onClick={() => setDayType("GOOD")}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl
                border-2 transition-all duration-200
                ${dayType === "GOOD"
                  ? "border-moss-400 bg-moss-50 shadow-md"
                  : "border-sage-100 bg-cream-50 hover:border-sage-200"
                }
              `}
              aria-pressed={dayType === "GOOD"}
            >
              <span className="text-3xl">🌿</span>
              <span className={`text-sm font-medium ${dayType === "GOOD" ? "text-moss-700" : "text-sage-500"}`}>
                Good Day
              </span>
            </button>

            <button
              type="button"
              onClick={() => setDayType("TOUGH")}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-xl
                border-2 transition-all duration-200
                ${dayType === "TOUGH"
                  ? "border-rose-300 bg-rose-50 shadow-md"
                  : "border-sage-100 bg-cream-50 hover:border-sage-200"
                }
              `}
              aria-pressed={dayType === "TOUGH"}
            >
              <span className="text-3xl">🥀</span>
              <span className={`text-sm font-medium ${dayType === "TOUGH" ? "text-rose-600" : "text-sage-500"}`}>
                Tough Day
              </span>
            </button>
          </div>

          {/* Full-width: Extra Self Care */}
          <div className={`rounded-xl p-[2px] transition-all duration-300 ${dayType === "SELF_CARE" ? "animate-shimmer" : ""}`}>
            <button
              type="button"
              onClick={() => setDayType("SELF_CARE")}
              className={`
                w-full flex items-center justify-center gap-3 p-4 rounded-[10px]
                border-2 transition-all duration-200
                ${dayType === "SELF_CARE"
                  ? "border-orchid-400 bg-orchid-50 shadow-lg"
                  : "border-sage-100 bg-cream-50 hover:border-orchid-200 hover:bg-orchid-50/30"
                }
              `}
              aria-pressed={dayType === "SELF_CARE"}
            >
              <span className="text-3xl">🌸</span>
              <div className="flex flex-col items-start">
                <span className={`text-sm font-semibold ${dayType === "SELF_CARE" ? "text-orchid-600" : "text-sage-500"}`}>
                  Extra Self Care
                </span>
                {dayType === "SELF_CARE" && (
                  <span className="text-xs text-orchid-400 animate-fade-in">
                    You deserve this
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label htmlFor="day-notes" className="block text-sm font-medium text-sage-700 mb-2">
            Notes <span className="text-sage-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="day-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={NOTES_PLACEHOLDERS[dayType]}
            rows={4}
            maxLength={1000}
            className="
              w-full rounded-xl border border-sage-200 bg-white
              p-3 text-sm text-sage-800 placeholder:text-sage-300
              focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent
              resize-none transition-shadow
            "
          />
          <p className="text-xs text-sage-400 mt-1 text-right">
            {notes.length}/1000
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 px-4 py-2.5 rounded-xl text-sm font-medium
              text-sage-600 bg-sage-50 hover:bg-sage-100
              transition-colors
            "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="
              flex-1 px-4 py-2.5 rounded-xl text-sm font-medium
              text-white bg-sage-500 hover:bg-sage-600
              transition-colors shadow-sm
            "
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}
