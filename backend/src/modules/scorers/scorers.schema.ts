import {z} from "zod";

export const scorerSchema = z.object({
    id: z.number(),
    name: z.string(),
    team: z.string(),
    goals: z.number(),
    assists: z.number(),
    rank: z.number().nullable(),
    avatar: z.string().nullable(),
    created_at: z.string(),
    });