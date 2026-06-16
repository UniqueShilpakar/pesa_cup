import { z } from "zod";

export const fixtureSchema = z.object({
  id: z.number().int().positive(),
  teamA: z.string().min(1).trim(),
  teamB: z.string().min(1).trim(),
  date: z.string(), // ISO date string: "2025-06-15"
  time: z.string(), // "14:00"
  venue: z.string().min(1).trim(),
  status: z.enum(["upcoming", "finished"]),
  scoreA: z.number().int().nonnegative().nullable(),
  scoreB: z.number().int().nonnegative().nullable(),
});