import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AccountType } from "../types/auth.types";
import { HTTP_STATUS } from "../types/http_status";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
    userId: string;
    email: string;
    role: AccountType;
}

export const auth = async ( req: Request, res: Response, next: NextFunction ) => {
    try{
        let token : string | undefined;

        //Exctract token...
        if(req.cookies?.token){
            token = req.cookies.token;
        }else if(req.headers.authorization?.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1];
        }else if(req.body.token){
            token = req.body.token;
        }

        if(!token){
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success: false,
                message: "Token missing",
            });
        }
        
        try{
            const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;

            req.user = {
                userId: decode.userId,
                email: decode.email,
                role: decode.role,
            };

            next();
        }catch(error) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success: false,
                message: "Invalid Token",
            });
        }
    }catch(error) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: "Invalid Token",
        });
    }
}