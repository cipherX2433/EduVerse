import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SignupInput, SigninInput } from "../types/auth.types";
import { error } from "node:console";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthService {
    static async signup(data: SignupInput){
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber} = data;

        if(password !== confirmPassword){
            throw new Error("Password do not match");
        }

        console.log(data);
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if(existingUser){
            throw new Error("User already exists with this email");
        }

        // //verify-otp
        // const latestOTP = await prisma.oTP.findFirst({
        //     where: { email },
        //     orderBy: { createdAt: "desc" },
        // });

        // if(!latestOTP || latestOTP.otp !== otp){
        //     throw new Error("Invalid OTP");
        // }

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
                image: "",
                profileId: profile.id,
            },
        });

        return {
            message: "User registered successfully",
            userId: user.id,
        };
    }

    static async signin(data: SigninInput){
        const {email, password} = data;

        const user = await prisma.user.findUnique({
            where: { email },
        });
        
        if(!user){
            throw new Error("User not registered");
        }

        if(!user.verified){
            throw new Error("account is not verified, first verify the account");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            {
              userId: user.id,
              email: user.email,
              role: user.accountType,
            },
            JWT_SECRET,
            { expiresIn: "24h" }
        );
        
        return {
            token,
            user: {
              id: user.id,
              email: user.email,
              role: user.accountType,
            },
        };
    }
}

