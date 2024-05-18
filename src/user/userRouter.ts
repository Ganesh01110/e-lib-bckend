import express from 'express'
import {createUser} from "./userController"

// const userRouter =()=>{ }

const userRouter = express.Router();

userRouter.post('/register',createUser);

export default userRouter;