import { z } from "zod";

export const ratingSchema = z.object({
    rating: z.number().min(1).max(5),
    review: z.string().min(5),
    courseId: z.string().uuid(),
  });
  