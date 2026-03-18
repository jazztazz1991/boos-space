"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { Calendar } from "@/components/Calendar";

export default function CalendarPage() {
  return (
    <AuthGuard>
      <Calendar />
    </AuthGuard>
  );
}
