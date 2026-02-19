import { z } from "zod";

export const createCourseSchema = z.object({
    courseName: z.string().min(3),
    courseDescription: z.string().optional(),
    whatYouWillLearn: z.string().optional(),
    price: z.number().nonnegative(),
    thumbnail: z.string().url().optional(),
    tag: z.array(z.string()).optional(),
    instructions: z.array(z.string()).optional(),
    status: z.enum(["Draft", "Published"]).optional(),
    categoryId: z.uuid().optional(),
});

export const updateCourseSchema = createCourseSchema.partial();
