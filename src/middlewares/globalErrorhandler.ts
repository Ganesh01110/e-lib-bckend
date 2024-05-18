import  express,{Request,Response,NextFunction,}  from "express";
import createHttpError,{HttpError} from "http-errors";
import {config} from "../config/config"

const globalErrorhandler = (
     error:HttpError,
     req:Request , 
     res:Response, 
     next:NextFunction
    )=>{
        const statuscode = error.statuscode || 500;
    
        return res.status(statuscode).json({
             message:error.message,
             errorStack:config.env === 'developement' ? error.stack : " "
        })
    }



export default globalErrorhandler;
