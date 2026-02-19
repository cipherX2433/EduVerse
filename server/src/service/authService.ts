import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { SignupInput, SigninInput } from "../types/auth.types";

export class AuthService {
    static async signup(data: SignupInput){
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = data;

        if(password !== confirmPassword){
            throw new Error("Password do not match");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if(existingUser){
            throw new Error("User already exists with this email");
        }

        //verify-otp
        const latestOTP = await prisma.oTP.findFirst({
            where: { email },
            orderBy: { createdAt: "desc" },
        });

        if(!latestOTP || latestOTP.otp !== otp){
            throw new Error("Invalid OTP");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profile = await prisma.profile.create({
            data: {
                contactNumber: contactNumber || null,
            },
        });

        const user = await prisma.user.create({
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

