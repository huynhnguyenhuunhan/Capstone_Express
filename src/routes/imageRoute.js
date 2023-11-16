import express from "express";
import {
  getCommentImage,
  getDetailImage,
  getImage,
  getImageSave,
  saveComment,
  searchImage,
  uploadImage,
} from "../controller/imageController.js";
import { checkToken, grantToken } from "../config/jwt.js";
import { upload } from "../controller/uploadController.js";

const imageRoute = express.Router();

// Get All Images
imageRoute.get("/get-image", grantToken, getImage);
// Search Image by Name
imageRoute.get("/search-image", grantToken, searchImage);
// Get Detail Image and User upload
imageRoute.get("/get-detail-image/:hinh_id", grantToken, getDetailImage);
// Get comment by image_id
imageRoute.get("/get-comment-image/:hinh_id", grantToken, getCommentImage);
// Get information about whether this image has been saved yet
imageRoute.get("/get-image-save/:hinh_id", grantToken, getImageSave);
//  Save comment of user for image
imageRoute.post("/save-comment/:hinh_id", grantToken, saveComment);
// Upload image
imageRoute.post(
  "/upload-image",
  grantToken,
  upload.single("file"),
  uploadImage
);

export default imageRoute;
