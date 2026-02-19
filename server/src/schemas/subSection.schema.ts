import { z } from "zod";

export const createSubSectionSchema = z.object({
    title: z.string().min(2),
    timeDuration: z.string().optional(),
    description: z.string().optional(),
    videoUrl: z.string().url().optional(),
    sectionId: z.string().uuid(),
  });
  