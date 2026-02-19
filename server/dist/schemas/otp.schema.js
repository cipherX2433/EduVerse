"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpSchema = void 0;
const zod_1 = require("zod");
exports.otpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    otp: zod_1.z.string().length(6),
});
//# sourceMappingURL=otp.schema.js.map