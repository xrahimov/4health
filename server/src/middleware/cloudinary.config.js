import multer from "multer";

import cloudinary from "cloudinary";

import { CloudinaryStorage } from "multer-storage-cloudinary";

const {
  CLOUDINARY_HOST,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

cloudinary.v2.config({
  cloud_name: CLOUDINARY_HOST,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "bahodir_shifo",
    format: async () => "png",
    public_id: (req, file) => file.filename,
  },
});

export const parser = multer({ storage: storage });

