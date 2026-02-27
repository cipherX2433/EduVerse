import { Request , Response} from "express";
import { HTTP_STATUS } from "../types/http_status";
import { createCategory, showAllCat } from "../service/category.service";


export const createCategoryController = async(
    req: Request, res: Response
) => {
    try{
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                message: "Missing fields required",
            });
        }

        const result = createCategory(name, description);

        return res.status(HTTP_STATUS.CREATED).json({
            data: result,
        })
    }catch(error: any){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
}

export const showAllCatController = async(
    req: Request, res: Response
) => {
    try{
        const result = showAllCat();

        return res.status(HTTP_STATUS.OK).json({
            data: result,
        })
    }catch(error:any){
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
}