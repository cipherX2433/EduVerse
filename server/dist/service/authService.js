"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = require("../lib/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthService {
    static async signup(data) {
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = data;
        if (password !== confirmPassword) {
            throw new Error("Password do not match");
        }
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error("User already exists with this email");
        }
        //verify-otp
        const latestOTP = await prisma_1.prisma.oTP.findFirst({
            where: { email },
            orderBy: { createdAt: "desc" },
        });
        if (!latestOTP || latestOTP.otp !== otp) {
            throw new Error("Invalid OTP");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const profile = await prisma_1.prisma.profile.create({
            data: {
                contactNumber: contactNumber || null,
            },
        });
        const user = await prisma_1.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                accountType,
                approved: accountType === "Instructor" ? false : true,
                image: "",
                profileId: profile.id,
            },
        });
        return {
            message: "User registered successfully",
            userId: user.id,
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map