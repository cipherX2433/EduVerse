import { prisma } from "../lib/prisma";
import { redis } from "../lib/redis";
import { mailSender } from "../utils/mailSender";
import { otpTemplate } from "../utils/otpTemplate";
import crypto from "crypto";

const OTP_EXPIRY_SECONDS = 300;
const OTP_COOLDOWN_SECONDS = 60;

export const generateOTP = (): string => {
    return crypto.randomInt(100000, 999999).toString();
}

export const sendVerificationOTP = async (
    email: string
  ): Promise<{ message: string }> => {
  
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    const otp = generateOTP();
  
    await redis.set(`otp:${email}`, otp, { EX: 300 });
  
    await mailSender(
      email,
      "Verify your account",
      otpTemplate(user.firstName, user.lastName, otp)  // 👈 pass name here
    );
  
    return { message: "OTP sent successfully" };
  };

export const verifyOTPService = async(
    email: string,
    otp: string
): Promise<{message: string}> => {

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if(!user){
        throw new Error("User not found");
    }

    if(user?.verified){
        throw new Error("User already verified");
    }

    const storedOtp = await redis.get(`otp:${email}`);

    if(!storedOtp){
        throw new Error("OTP Expired or not generated");
    }

    if(storedOtp !== otp){
        throw new Error("Incorrect OTP");
    }

    await prisma.user.update({
        where: { email },
        data: { verified: true },
    }); 

    await redis.del(`otp:${email}`);

    return { message: "Account verified successfully" };
}