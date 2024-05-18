import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body; //aquired by destructturing

  //    validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "all fields are required");

    return next(error);
  }

  // database call and user existence check

  try {
    const user = await userModel.findOne({ email: email });

    if (user) {
      const error = createHttpError(400, "user already exist with this email");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "error while getting user"));
  }

  ///storing hased password
  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: User;

  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "error while creating user"));
  }

  try {
    // token generation
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
      algorithm: "HS256",
    });

    // response

    res.status(201).json({ message: "user created", accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "error while signing jwt token"));
  }
};





const loginUser = async (req: Request, res: Response, next: NextFunction) =>{
    //    res.json({message:"sab badhiya hai vai,login kliye teyarrr"})

    const { email, password } = req.body; //aquired by destructturing

      //    validation
  if ( !email || !password) {
    const error = createHttpError(400, "all fields are required");

    return next(error);
  }

//   datbase call

// try{}catch(error){}
try {
    const user = await userModel.findOne({ email });

    if (!user) {
        return next(createHttpError(404, "User not found"));
    }

    // password matching
    try {
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(createHttpError(400, "Incorrect credentials"));
        }

        // Proceed with further logic here (e.g., generating a token, etc.)
    } catch (error) {
        return next(createHttpError(500, "Error while comparing passwords"));
    }

    // access token generation
    try{
        const token = sign({ sub: user._id }, config.jwtSecret as string, {
            expiresIn: "7d",
            algorithm: "HS256",
          });
      
          res.status(201).json({ message: "user logged in", accessToken: token });


    }catch(error){
      
        return next(createHttpError(500, "Error while token generation"));

    }

} catch (error) {
    return next(createHttpError(500, "Error while connecting to database"));
}




}

export { createUser,loginUser };
