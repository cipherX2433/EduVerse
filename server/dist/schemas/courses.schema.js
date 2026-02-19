"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseSchema = exports.createCourseSchema = void 0;
const zod_1 = require("zod");
exports.createCourseSchema = zod_1.z.object({
    courseName: zod_1.z.string().min(3),
    courseDescription: zod_1.z.string().optional(),
    whatYouWillLearn: zod_1.z.string().optional(),
    price: zod_1.z.number().nonnegative(),
    thumbnail: zod_1.z.string().url().optional(),
    tag: zod_1.z.array(zod_1.z.string()).optional(),
    instructions: zod_1.z.array(zod_1.z.string()).optional(),
    status: zod_1.z.enum(["Draft", "Published"]).optional(),
    categoryId: zod_1.z.uuid().optional(),
});
exports.updateCourseSchema = exports.createCourseSchema.partial();
//# sourceMappingURL=courses.schema.js.map