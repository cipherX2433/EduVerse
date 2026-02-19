import { z } from "zod";

export const courseProgressSchema = z.object({
    courseId: z.string().uuid(),
    completedVideos: z.array(z.string().uuid()).optional(),
  });
  