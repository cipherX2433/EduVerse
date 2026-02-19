"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSectionSchema = void 0;
const zod_1 = require("zod");
exports.createSectionSchema = zod_1.z.object({
    sectionName: zod_1.z.string().min(3),
    courseId: zod_1.z.uuid(),
});
//# sourceMappingURL=section.schema.js.map