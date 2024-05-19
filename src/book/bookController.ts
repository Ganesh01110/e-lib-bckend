import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from "node:fs";
import { AuthRequest } from "../middlewares/authenticate";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files", req.files);

  const { title, genre } = req.body;

  const files = req.files as { [filename: string]: Express.Multer.File[] };

  const coverimageMimeType = files.coverimage[0].mimetype.split("/").at(-1);

  try {
    // folder cretion for cover images
    const fileName = files.coverimage[0].filename;

    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );

    // uploading cover image into cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverimageMimeType,
    });

    // folder creation for book pdf files

    const bookFileName = files.file[0].filename;
    const bookfilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    // uploading book pdf into cloudinary
    const bookFileuploadResult = await cloudinary.uploader.upload(
      bookfilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );

    // console.log(" bookFileuploadResult", bookFileuploadResult)

    // console.log("uploadResults", uploadResult)

    // // @ts-ignore
    // console.log("user id",req.userId)

    const _req = req as AuthRequest;

    const newBook = await bookModel.create({
      title,
      genre,
      author: _req.userId,
      coverimage: uploadResult.secure_url,
      file: bookFileuploadResult.secure_url,
    });

    // delete temp files

    try {
      await fs.promises.unlink(filePath);
      await fs.promises.unlink(bookfilePath);
    } catch (error) {
      return next(createHttpError(500, "error while deleting temporary files"));
    }

    res.status(201).json({ id: newBook._id });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "error while uploading files"));
  }
};

//   try{

// }catch(error){
//     return next(createHttpError(404, "error , book not found"));

// }

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, genre } = req.body;
    const bookId = req.params.bookId;

    const book = await bookModel.findOne({ _id: bookId });

    if (!book) {
      return next(createHttpError(404, "book not found"));
    }

    // check access of author
    const _req = req as AuthRequest;

    if (book.author.toString() != _req.userId) {
      return next(
        createHttpError(403, "unauthorized,you cant update others book")
      );
    }

    // check if image field exist
    const files = req.files as { [filename: string]: Express.Multer.File[] };

    let completeCoverImage = " ";
    if (files.coverimage) {
      const filename = files.coverimage[0].filename;
      const coverimageMimeType = files.coverimage[0].mimetype.split("/").at(-1);

      // send files to cloudnary
      const filePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        filename
      );
      completeCoverImage = filename;
      // uploading cover image into cloudinary
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        filename_override: completeCoverImage,
        folder: "book-covers",
        format: coverimageMimeType,
      });

      completeCoverImage = uploadResult.secure_url;
      try {
        await fs.promises.unlink(filePath);
      } catch (error) {
        return next(
          createHttpError(
            404,
            "error , bookfilecover coudldnt deleted from temp"
          )
        );
      }
    }

    let completeFileName = " ";
    if (files.file) {
      const bookFilePath = path.resolve(
        __dirname,
        "../../public/data/uploads",
        files.file[0].filename
      );

      const bookFileName = files.file[0].filename;
      completeFileName = bookFileName;

      const uploadResultPdf = await cloudinary.uploader.upload(bookFilePath, {
        resource_type: "raw",
        filename_override: completeFileName,
        folder: "book-covers",
        format: "pdf",
      });

      completeFileName = uploadResultPdf.secure_url;

      try {
        await fs.promises.unlink(bookFilePath);
      } catch (error) {
        return next(
          createHttpError(404, "error , bookfile coudldnt deleted from temp")
        );
      }
    }

    const updatedBook = await bookModel.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        title: title,
        genre: genre,
        coverimage: completeCoverImage ? completeCoverImage : book.coverimage,
        file: completeFileName ? completeFileName : book.file,
      },
      {
        new: true,
      }
    );

    res.json(updatedBook);
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "error while updating files"));
  }
};

const listBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // add pagination
    const book = await bookModel.find();
    res.json(book);
  } catch (error) {
    return next(createHttpError(500, "error , booklist not found"));
  }
};
export { createBook, updateBook, listBooks };
