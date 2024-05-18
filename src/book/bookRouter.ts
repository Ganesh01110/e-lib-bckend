import express from 'express'
import {createBook} from "./bookController"

// const userRouter =()=>{ }

const bookRouter = express.Router();

bookRouter.post('/',createBook);


export default bookRouter;