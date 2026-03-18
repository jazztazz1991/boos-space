import {
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDateKey,
  parseDateKey,
  getMonthName,
  isToday,
} from "@/lib/utils";

describe("getDaysInMonth", () => {
  it("returns 31 for January", () => {
    expect(getDaysInMonth(2026, 0)).toBe(31);
  });

  it("returns 28 for February in a non-leap year", () => {
    expect(getDaysInMonth(2026, 1)).toBe(28);
  });

  it("returns 29 for February in a leap year", () => {
    expect(getDaysInMonth(2024, 1)).toBe(29);
  });

  it("returns 30 for April", () => {
    expect(getDaysInMonth(2026, 3)).toBe(30);
  });
});

describe("getFirstDayOfMonth", () => {
  it("returns correct day of week for known date", () => {
    // March 1, 2026 is a Sunday = 0
    expect(getFirstDayOfMonth(2026, 2)).toBe(0);
  });
});

describe("formatDateKey", () => {
  it("formats date as YYYY-MM-DD", () => {
    const date = new Date(2026, 2, 15); // March 15, 2026
    expect(formatDateKey(date)).toBe("2026-03-15");
  });

  it("pads single-digit months and days", () => {
    const date = new Date(2026, 0, 5); // Jan 5, 2026
    expect(formatDateKey(date)).toBe("2026-01-05");
  });
});

describe("parseDateKey", () => {
  it("parses YYYY-MM-DD to Date", () => {
    const date = parseDateKey("2026-03-15");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(2); // 0-indexed
    expect(date.getDate()).toBe(15);
  });
});

describe("getMonthName", () => {
  it("returns correct month names", () => {
    expect(getMonthName(0)).toBe("January");
    expect(getMonthName(11)).toBe("December");
    expect(getMonthName(5)).toBe("June");
  });
});

describe("isToday", () => {
  it("returns true for today's date", () => {
    const now = new Date();
    expect(isToday(now.getFullYear(), now.getMonth(), now.getDate())).toBe(true);
  });

  it("returns false for a past date", () => {
    expect(isToday(2020, 0, 1)).toBe(false);
  });
});
