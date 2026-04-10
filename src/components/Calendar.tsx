"use client";

import { useCalendar } from "@/viewmodels/useCalendar";
import { CalendarDay } from "./CalendarDay";
import { DayModal } from "./DayModal";
import { LeafBorder, HangingPlant, CornerVine } from "./PlantIcon";
import { GrowingVine } from "./GrowingVine";
import { LeafShower } from "./LeafShower";
import { PetalShower } from "./PetalShower";
import { getMonthName, formatDateKey } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function Calendar() {
  const {
    year,
    month,
    daysInMonth,
    firstDayOfMonth,
    entries,
    selectedDate,
    isModalOpen,
    isLoading,
    celebratingDate,
    celebrationType,
    showLeafShower,
    showPetalShower,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    openDay,
    closeModal,
    saveEntry,
    deleteEntry,
    clearLeafShower,
    clearPetalShower,
  } = useCalendar();

  const selectedEntry = selectedDate ? entries.get(selectedDate) : undefined;

  // Calculate stats for the month
  const totalEntries = entries.size;
  const goodDays = Array.from(entries.values()).filter((e) => e.dayType === "GOOD").length;
  const toughDays = Array.from(entries.values()).filter((e) => e.dayType === "TOUGH").length;
  const selfCareDays = Array.from(entries.values()).filter((e) => e.dayType === "SELF_CARE").length;

  // Self care days also count as positive for vine growth
  const positiveDays = goodDays + selfCareDays;

  const days = [];
  // Empty cells for days before the 1st
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-14 sm:min-h-20" />);
  }
  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = formatDateKey(new Date(year, month, day));
    days.push(
      <CalendarDay
        key={day}
        day={day}
        year={year}
        month={month}
        entry={entries.get(dateKey)}
        isCelebrating={celebratingDate === dateKey}
        celebrationType={celebrationType}
        onClick={openDay}
      />
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 watercolor-bg">
      {/* Decorative elements */}
      <div className="fixed top-0 right-0 text-sage-500 pointer-events-none opacity-40">
        <HangingPlant className="w-24 h-32" />
      </div>
      <div className="fixed bottom-0 left-0 text-sage-500 pointer-events-none">
        <CornerVine className="w-40 h-40" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="font-heading text-4xl md:text-5xl text-sage-800 mb-2">
            Boo&apos;s Garden
          </h1>
          <p className="text-sage-500 text-sm">
            Tend your daily garden, one day at a time
          </p>
          <LeafBorder className="w-48 h-8 mx-auto mt-2 text-sage-500" />
        </header>

        {/* Calendar card with growing vines */}
        <div className="relative">
          {/* Growing vines on each side */}
          <GrowingVine goodDays={positiveDays} totalDays={daysInMonth} side="left" />
          <GrowingVine goodDays={positiveDays} totalDays={daysInMonth} side="right" />

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sage-100 overflow-hidden">
          {/* Month navigation */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-5 bg-linear-to-r from-sage-50 to-moss-50 border-b border-sage-100">
            <button
              onClick={goToPreviousMonth}
              className="
                p-2 rounded-xl text-sage-600 hover:bg-white/60
                transition-colors focus:outline-none focus:ring-2 focus:ring-sage-300
              "
              aria-label="Previous month"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="text-center">
              <h2 className="font-heading text-2xl md:text-3xl text-sage-800">
                {getMonthName(month)}
              </h2>
              <p className="text-sage-500 text-sm">{year}</p>
            </div>

            <button
              onClick={goToNextMonth}
              className="
                p-2 rounded-xl text-sage-600 hover:bg-white/60
                transition-colors focus:outline-none focus:ring-2 focus:ring-sage-300
              "
              aria-label="Next month"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Today button + stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-2 sm:py-3 gap-2 border-b border-sage-50">
            <button
              onClick={goToToday}
              className="
                text-xs font-medium text-sage-500 hover:text-sage-700
                px-3 py-1.5 rounded-lg hover:bg-sage-50 transition-colors
              "
            >
              Go to Today
            </button>

            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-sage-500">
              <span className="flex items-center gap-1">
                <span>🌿</span> {goodDays} good
              </span>
              <span className="flex items-center gap-1">
                <span>🥀</span> {toughDays} tough
              </span>
              <span className="flex items-center gap-1">
                <span>🌸</span> {selfCareDays} self care
              </span>
              <span className="flex items-center gap-1">
                <span>🌱</span> {daysInMonth - totalEntries} unlogged
              </span>
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-sway text-4xl mb-2">🌿</div>
                <p className="text-sage-400 text-sm">Loading entries...</p>
              </div>
            </div>
          )}

          {/* Calendar grid */}
          {!isLoading && (
            <div className="p-2 sm:p-4 md:p-6">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1 sm:mb-2">
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-[10px] sm:text-xs font-semibold text-sage-400 uppercase tracking-wider py-1 sm:py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {days}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-sage-50/50 border-t border-sage-100">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs text-sage-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-moss-100 border border-moss-200" />
                Good day
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-100 border border-rose-200" />
                Tough day
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-orchid-100 border border-orchid-200" />
                Self care day
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cream-100 border border-cream-200" />
                Not logged
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-bark-400" />
                Has notes
              </span>
            </div>
          </div>
        </div>

        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-sage-400 text-xs">
          <p>Every day is a chance to grow 🌱</p>
        </footer>
      </div>

      {/* Celebration leaf shower */}
      <LeafShower isActive={showLeafShower} onComplete={clearLeafShower} />

      {/* Celebration petal shower */}
      <PetalShower isActive={showPetalShower} onComplete={clearPetalShower} />

      {/* Day Modal */}
      <DayModal
        isOpen={isModalOpen}
        dateKey={selectedDate}
        entry={selectedEntry}
        onSave={saveEntry}
        onDelete={deleteEntry}
        onClose={closeModal}
      />
    </div>
  );
}
