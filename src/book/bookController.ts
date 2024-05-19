import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary"
import path from 'node:path'
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from 'node:fs'



const createBook = async (req: Request, res: Response, next: NextFunction) => {

    console.log("files", req.files);

    const {title,genre} = req.body;

    const files = req.files as { [filename: string]: Express.Multer.File[] }

    const coverimageMimeType = files.coverimage[0].mimetype.split('/').at(-1);


    try {
        // folder cretion for cover images
        const fileName = files.coverimage[0].filename;

        const filePath = path.resolve(__dirname, '../../public/data/uploads', fileName)


        // uploading cover image into cloudinary
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: 'book-covers',
            format: coverimageMimeType,
        })

        // folder creation for book pdf files

        const bookFileName = files.file[0].filename;
        const bookfilePath = path.resolve(__dirname, '../../public/data/uploads', bookFileName)

        // uploading book pdf into cloudinary
        const bookFileuploadResult = await cloudinary.uploader.upload(bookfilePath, {
            resource_type: 'raw',
            filename_override: bookFileName,
            folder: 'book-pdfs',
            format: "pdf",
        })

        console.log(" bookFileuploadResult", bookFileuploadResult)

        console.log("uploadResults", uploadResult)

        // @ts-ignore
        console.log("user id",req.userId)

        const newBook = await bookModel.create({
            title,
            genre,
            author: "6648d80b7bc85cc6ff4e034d",
            coverimage:uploadResult.secure_url,
            file:bookFileuploadResult.secure_url,
        })

        // delete temp files

        try{
            await fs.promises.unlink(filePath)
            await fs.promises.unlink( bookfilePath)
        }catch(error){
            return next(createHttpError(500, "error while deleting temporary files"));
        }

       
        res.status(201).json({id:newBook._id});


    } catch (error) {
        console.log(error)
        return next(createHttpError(500, "error while uploading files"));


    }






}

export { createBook };