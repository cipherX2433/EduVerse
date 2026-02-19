"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2),
    lastName: zod_1.z.string().min(2),
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6),
    confirmPassword: zod_1.z.string().min(6),
    accountType: zod_1.z.enum(["Admin", "Student", "Instructor"]),
    contactNumber: zod_1.z.string().optional(),
    otp: zod_1.z.string().length(6),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string().min(6),
});
//# sourceMappingURL=user.schema.js.map