import { Request, Response } from "express";
import { SigninInput, SignupInput } from "../types/auth.types";
import { AuthService } from "../service/authService";
import { HTTP_STATUS } from "../types/http_status";

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
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || "Signin failed",
      });
    }
};