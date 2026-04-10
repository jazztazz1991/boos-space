import { CreateEntrySchema, GetEntriesSchema } from "@/domain/entry";

describe("CreateEntrySchema", () => {
  it("accepts valid input with all fields", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      dayType: "GOOD",
      notes: "Feeling good today",
    });
    expect(result.success).toBe(true);
  });

  it("accepts TOUGH day type", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      dayType: "TOUGH",
    });
    expect(result.success).toBe(true);
  });

  it("accepts SELF_CARE day type", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      dayType: "SELF_CARE",
      notes: "Bath and journaling",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid input without notes", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      dayType: "GOOD",
    });
    expect(result.success).toBe(true);
  });

  it("accepts empty string notes as valid", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      dayType: "GOOD",
      notes: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing date", () => {
    const result = CreateEntrySchema.safeParse({
      dayType: "GOOD",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid date format", () => {
    const result = CreateEntrySchema.safeParse({
      date: "not-a-date",
      dayType: "GOOD",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing dayType", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid dayType value", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      dayType: "GREAT",
    });
    expect(result.success).toBe(false);
  });

  it("rejects boolean for dayType (old format)", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      dayType: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects notes longer than 1000 characters", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      dayType: "GOOD",
      notes: "a".repeat(1001),
    });
    expect(result.success).toBe(false);
  });

  it("accepts notes exactly 1000 characters", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      dayType: "GOOD",
      notes: "a".repeat(1000),
    });
    expect(result.success).toBe(true);
  });
});

describe("GetEntriesSchema", () => {
  it("accepts valid YYYY-MM format", () => {
    const result = GetEntriesSchema.safeParse({ month: "2026-03" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid format", () => {
    const result = GetEntriesSchema.safeParse({ month: "March 2026" });
    expect(result.success).toBe(false);
  });

  it("rejects missing month", () => {
    const result = GetEntriesSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects YYYY-M format (missing leading zero)", () => {
    const result = GetEntriesSchema.safeParse({ month: "2026-3" });
    expect(result.success).toBe(false);
  });
});
