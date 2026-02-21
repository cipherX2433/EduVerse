import { Request, Response } from "express";
import { SigninInput, SignupInput } from "../types/auth.types";
import { AuthService } from "../service/authService";
import { HTTP_STATUS } from "../types/http_status";
import { sendVerficationOTP, verifyOTPService } from "../service/otpService";

export const signup = async (req: Request<{}, {}, SignupInput>, res: Response): Promise<void> => {
    try{
        const result = await AuthService.signup(req.body);

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: result.message,
            data: {
                userId: result.userId,
            },
        });
    }catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message || "Signup failed",
        });
    }
}

export const signin = async (
    req: Request<{}, {}, SigninInput>,
    res: Response
  ): Promise<void> => {
    try {
      const result = await AuthService.signin(req.body);
  
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
  
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: error.message || "Signin failed",
      });
    }
};

export const sendOtpController = async (req: Request, res: Response) => {
  try{
    const { email } = req.body;

    if(!email){
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "email is required",
      });
    }

    const result = await sendVerficationOTP(email);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  }catch(error: any){
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
}

export const verifyOTP = async(req: Request, res: Response) => {
  try{
    const {email, otp} = req.body;

    if(!email || !otp){
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Both email and otp required",
      });
    }
    const result: any = await verifyOTPService(email, otp);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: result.message,
    });
  }catch(error: any){
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
}