import { prisma } from "@/lib/prisma";
import type { CreateEntryInput, EntryDTO } from "./entry";

function toDTO(entry: {
  id: string;
  date: Date;
  didBinge: boolean;
  notes: string | null;
}): EntryDTO {
  return {
    id: entry.id,
    date: entry.date.toISOString().split("T")[0],
    didBinge: entry.didBinge,
    notes: entry.notes,
  };
}

export async function getEntriesForMonth(
  userId: string,
  year: number,
  month: number
): Promise<EntryDTO[]> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const entries = await prisma.entry.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
    select: {
      id: true,
      date: true,
      didBinge: true,
      notes: true,
    },
    orderBy: { date: "asc" },
  });

  return entries.map(toDTO);
}

export async function upsertEntry(
  userId: string,
  input: CreateEntryInput
): Promise<EntryDTO> {
  const date = new Date(input.date + "T00:00:00.000Z");

  const entry = await prisma.entry.upsert({
    where: {
      date_userId: {
        date,
        userId,
      },
    },
    update: {
      didBinge: input.didBinge,
      notes: input.notes ?? null,
    },
    create: {
      date,
      didBinge: input.didBinge,
      notes: input.notes ?? null,
      userId,
    },
    select: {
      id: true,
      date: true,
      didBinge: true,
      notes: true,
    },
  });

  return toDTO(entry);
}
