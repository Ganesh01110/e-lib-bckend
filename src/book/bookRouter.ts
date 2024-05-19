import express from 'express'
import {createBook} from "./bookController"
import multer from 'multer'
import path from 'node:path'

// const userRouter =()=>{ }

const bookRouter = express.Router();

const upload = multer({
    dest:path.resolve(__dirname,'../../public/data/uploads'),//if the file doesnt exist multer creates it by it self
    limits:{fileSize:3e7}//3e7= 30mb
})

bookRouter.post('/',upload.fields([
    {name:'coverImage',maxCount:1},
    {name:'file',maxCount:1}
]),createBook);


export default bookRouter;