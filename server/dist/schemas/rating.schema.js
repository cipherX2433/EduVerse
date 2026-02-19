"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingSchema = void 0;
const zod_1 = require("zod");
exports.ratingSchema = zod_1.z.object({
    rating: zod_1.z.number().min(1).max(5),
    review: zod_1.z.string().min(5),
    courseId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=rating.schema.js.map