import {Request,Response,NextFunction} from 'express';
import createHttpError from "http-errors";
import userModel from "./userModel"

const createUser = async (req:Request,res:Response,next:NextFunction)=>{

    const {name,email,password }= req.body;  //aquired by destructturing

//    validation
if(!name || !email ||!password){
    const error= createHttpError(400,"all fields are required");

    return next(error);
}

// database call and user existence check
const user = await userModel.findOne({email:email})

if (user) {
    const error = createHttpError(400,"user already exist with this email");
    return next(error);
}

// process

// response



    res.json({message:"user created"});
}

export {
    createUser
}