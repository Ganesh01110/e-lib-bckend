import {Request,Response,NextFunction} from 'express';
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt"
import {sign} from "jsonwebtoken"
import {config} from "../config/config"

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

///storing hased password
const hashedPassword = await bcrypt.hash(password,10);

const newUser = await userModel.create({
    name,email,password:hashedPassword,
})

// token generation
const token = sign({sub:newUser._id},config.jwtSecret as string, {expiresIn :'7d',algorithm:"HS256"})



// response

    res.json({message:"user created", accessToken: token});
}

export {
    createUser
}