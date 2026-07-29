import type { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file)
    return res.status(400).json({
      message: "No image uploaded",
    });
  res.status(200).json({
    message: "Uploaded successfully",
    file: req.file.filename,
  });
};
