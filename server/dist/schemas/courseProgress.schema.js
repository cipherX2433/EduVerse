"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseProgressSchema = void 0;
const zod_1 = require("zod");
exports.courseProgressSchema = zod_1.z.object({
    courseId: zod_1.z.string().uuid(),
    completedVideos: zod_1.z.array(zod_1.z.string().uuid()).optional(),
});
//# sourceMappingURL=courseProgress.schema.js.map