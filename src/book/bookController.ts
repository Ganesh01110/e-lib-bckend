import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary"
import path from 'node:path'
import createHttpError from "http-errors";


const createBook = async (req: Request, res: Response, next: NextFunction) => {

    console.log("files",req.files);

    const files = req.files as {[filename:string]:Express.Multer.File[] }

    const coverimageMimeType =files.coverimage[0].mimetype.split('/').at(-1);


    
   
  

    try{
        // folder cretion for cover images
        const fileName=files.coverimage[0].filename;

        const filePath= path.resolve(__dirname,'../../public/data/uploads',fileName)


        // uploading cover image into cloudinary
        const uploadResult=await cloudinary.uploader.upload(filePath,{
            filename_override:fileName,
            folder:'book-covers',
            format:coverimageMimeType,
        })
    
        // folder creation for book pdf files

        const bookFileName = files.file[0].filename;
        const bookfilePath= path.resolve(__dirname,'../../public/data/uploads',bookFileName)

        // uploading book pdf into cloudinary
        const bookFileuploadResult = await cloudinary.uploader.upload(bookfilePath,{
            resource_type:'raw',
            filename_override:bookFileName,
            folder:'book-pdfs',
            format:"pdf",
        })

        console.log(" bookFileuploadResult", bookFileuploadResult)

        console.log("uploadResults",uploadResult)


    }catch(error){
        console.log(error)
        return next(createHttpError(500, "error while uploading files"));


    }
    

 


    res.json({});
}

export {createBook};