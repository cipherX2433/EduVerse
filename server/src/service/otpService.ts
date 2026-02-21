import { prisma } from "../lib/prisma";
import { mailSender } from "../utils/mailSender";
import { otpTemplate } from "../utils/otpTemplate";
import crypto from "crypto";

export const generateOTP = (): string => {
    return crypto.randomInt(100000, 999999).toString();
}

export const sendVerficationOTP = async (
    email: string
): Promise<{message: string}> => {

    const recentOTP = await prisma.oTP.findFirst({
        where: {email},
        orderBy: { createdAt: "desc" },
    });

    if(recentOTP){
        const timeDiff = Date.now() - recentOTP.createdAt.getTime();

        if(timeDiff < 60 * 1000){
            throw new Error("Please wait before requesting new OTP");
        }
    }

    const otp = generateOTP();

    await prisma.oTP.create({
        data: {
            email,
            otp,
        },
    });

    await mailSender(
        email,
        "Verify your account",
        otpTemplate(otp),
    );

    return { message: "OTP sent successfully" };
}

export const verifyOTPService = async(
    email: string,
    otp: string
): Promise<{message: string}> => {
    const latestOtp = await prisma.oTP.findFirst({
        where: { email },
        orderBy: { createdAt: "desc" },
    });

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if(user?.verified === true){
        throw new Error("User is already verified");
    }

    if(!latestOtp){
        throw new Error("OTP is not created");
    }

    const isExpired = Date.now() - latestOtp.createdAt.getTime() > 5 * 60 * 1000;

    if(isExpired){
        throw new Error("OTP is expired, generate new Otp");
    }

    if(latestOtp.otp !== otp){
        throw new Error("Incorrect otp");
    }

    await prisma.user.update({
        where: { email },
        data: { verified: true },
    }); 

    await prisma.oTP.deleteMany({
        where: { email },
    });
    return { message: "Account verified successfully" };
}