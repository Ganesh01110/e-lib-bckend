import express from 'express'
import {createBook,updateBook,listBooks,getsingleBook,deleteBook} from "./bookController"
import multer from 'multer'
import path from 'node:path'
import authenticate from "../middlewares/authenticate"

// const userRouter =()=>{ }

const bookRouter = express.Router();

const upload = multer({
    dest:path.resolve(__dirname,'../../public/data/uploads'),
    //if the file doesnt exist multer creates it by it self
    limits:{fileSize:3e7}//3e7= 30mb
})

bookRouter.post('/', authenticate, upload.fields([
    {name:'coverimage',maxCount:1},
    {name:'file',maxCount:1}
]),createBook);


bookRouter.get('/',listBooks);



bookRouter.put('/:bookId', authenticate, upload.fields([
    {name:'coverimage',maxCount:1},
    {name:'file',maxCount:1}
]),updateBook);

bookRouter.get('/:bookId',getsingleBook);

bookRouter.delete('/:bookId', authenticate, deleteBook);




export default bookRouter;