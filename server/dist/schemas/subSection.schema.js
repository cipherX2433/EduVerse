"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubSectionSchema = void 0;
const zod_1 = require("zod");
exports.createSubSectionSchema = zod_1.z.object({
    title: zod_1.z.string().min(2),
    timeDuration: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    videoUrl: zod_1.z.string().url().optional(),
    sectionId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=subSection.schema.js.map