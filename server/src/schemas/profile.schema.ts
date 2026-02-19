import { z } from "zod";

export const profileSchema = z.object({
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    about: z.string().optional(),
    contactNumber: z.string().min(10).max(15).optional(),
});