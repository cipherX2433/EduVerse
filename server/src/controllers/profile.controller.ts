import { Request, Response } from "express";
import { getAllUserDetailsService, getEnrolledCourses, instructorDashboard } from "../service/profile.service";
import { HTTP_STATUS } from "../types/http_status";


export const getAllUser = async(req: Request, res: Response) => {
    try{
        if (!req.user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const userId = req.user.userId;
        const userDetails = await getAllUserDetailsService(userId);

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "User data fetched successfully",
            data: userDetails,
        });

    }catch(error:any){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
};

export const getEnrollCourseController = async(
    req: Request, res: Response
) => {
    try{
        if (!req.user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const usedId = req.user?.userId;

        const courses = await getEnrolledCourses(usedId);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: courses
        });
    }catch(error: any){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
          });
    }
};

export const instructorDashboardController = async(req: Request, res: Response) => {
    try{
        const userId = req.user?.userId;

        if(!userId){
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success: false,
                message: "User not authorized",
            });
        }

        const result = instructorDashboard(userId);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: result
        });
    }catch(error:any){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
          });
    }
}