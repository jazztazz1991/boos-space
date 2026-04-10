"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getDaysInMonth, getFirstDayOfMonth, formatDateKey } from "@/lib/utils";
import type { DayType, EntryDTO } from "@/domain/entry";

export interface CalendarState {
  year: number;
  month: number;
  entries: Map<string, EntryDTO>;
  selectedDate: string | null;
  isModalOpen: boolean;
  isLoading: boolean;
}

export function useCalendar() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [entries, setEntries] = useState<Map<string, EntryDTO>>(new Map());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [celebratingDate, setCelebratingDate] = useState<string | null>(null);
  const [celebrationType, setCelebrationType] = useState<"good" | "selfCare">("good");
  const [showLeafShower, setShowLeafShower] = useState(false);
  const [showPetalShower, setShowPetalShower] = useState(false);
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
    const res = await fetch(`/api/entries?month=${monthStr}`);
    if (res.ok) {
      const data = await res.json();
      const map = new Map<string, EntryDTO>();
      data.entries.forEach((entry: EntryDTO) => {
        map.set(entry.date, entry);
      });
      setEntries(map);
    }
    setIsLoading(false);
  }, [year, month]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const goToPreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  const openDay = (day: number) => {
    const date = new Date(year, month, day);
    setSelectedDate(formatDateKey(date));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const saveEntry = async (
    dateKey: string,
    dayType: DayType,
    notes: string
  ) => {
    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: dateKey,
        dayType,
        notes: notes || undefined,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setEntries((prev) => {
        const next = new Map(prev);
        next.set(data.entry.date, data.entry);
        return next;
      });

      // Trigger celebration for good days and self care days
      if (dayType === "GOOD") {
        setCelebratingDate(dateKey);
        setCelebrationType("good");
        setShowLeafShower(true);

        if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
        celebrationTimer.current = setTimeout(() => {
          setCelebratingDate(null);
        }, 1000);
      } else if (dayType === "SELF_CARE") {
        setCelebratingDate(dateKey);
        setCelebrationType("selfCare");
        setShowPetalShower(true);

        if (celebrationTimer.current) clearTimeout(celebrationTimer.current);
        celebrationTimer.current = setTimeout(() => {
          setCelebratingDate(null);
        }, 1000);
      }
    }

    closeModal();
  };

  const deleteEntry = async (dateKey: string) => {
    const res = await fetch("/api/entries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: dateKey }),
    });

    if (res.ok) {
      setEntries((prev) => {
        const next = new Map(prev);
        next.delete(dateKey);
        return next;
      });
    }

    closeModal();
  };

  const clearLeafShower = useCallback(() => {
    setShowLeafShower(false);
  }, []);

  const clearPetalShower = useCallback(() => {
    setShowPetalShower(false);
  }, []);

  return {
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
  };
}
