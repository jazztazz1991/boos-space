import { z } from "zod/v4";

export const CreateEntrySchema = z.object({
  date: z.iso.date(),
  didBinge: z.boolean(),
  notes: z.string().max(1000).optional(),
});

export const GetEntriesSchema = z.object({
  month: z.string().regex(/^\d{4}-\d{2}$/, "Must be YYYY-MM format"),
});

export type CreateEntryInput = z.infer<typeof CreateEntrySchema>;
export type GetEntriesQuery = z.infer<typeof GetEntriesSchema>;

export interface EntryDTO {
  id: string;
  date: string;
  didBinge: boolean;
  notes: string | null;
}
