"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileSchema = void 0;
const zod_1 = require("zod");
exports.profileSchema = zod_1.z.object({
    gender: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    about: zod_1.z.string().optional(),
    contactNumber: zod_1.z.string().min(10).max(15).optional(),
});
//# sourceMappingURL=profile.schema.js.map