import { CreateEntrySchema, GetEntriesSchema } from "@/domain/entry";

describe("CreateEntrySchema", () => {
  it("accepts valid input with all fields", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      didBinge: false,
      notes: "Feeling good today",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid input without notes", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      didBinge: true,
    });
    expect(result.success).toBe(true);
  });

  it("accepts empty string notes as valid", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      didBinge: false,
      notes: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing date", () => {
    const result = CreateEntrySchema.safeParse({
      didBinge: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid date format", () => {
    const result = CreateEntrySchema.safeParse({
      date: "not-a-date",
      didBinge: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing didBinge", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-boolean didBinge", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      didBinge: "yes",
    });
    expect(result.success).toBe(false);
  });

  it("rejects notes longer than 1000 characters", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      didBinge: false,
      notes: "a".repeat(1001),
    });
    expect(result.success).toBe(false);
  });

  it("accepts notes exactly 1000 characters", () => {
    const result = CreateEntrySchema.safeParse({
      date: "2026-03-15",
      didBinge: false,
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
