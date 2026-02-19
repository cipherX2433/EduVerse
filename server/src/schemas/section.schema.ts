import { z } from "zod";

export const createSectionSchema = z.object({
    sectionName: z.string().min(3),
    courseId: z.uuid(),
});

