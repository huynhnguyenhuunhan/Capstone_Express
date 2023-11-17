import express from "express";
import {
  deleteImage,
  getDetailUser,
  getListImages,
  getListImagesMake,
  updateUserinfo,
  uploadAvatar,
  userLogin,
  userSignUp,
} from "../controller/userController.js";
import { checkToken, grantToken } from "../config/jwt.js";
import { upload } from "../controller/uploadController.js";

const userRoute = express.Router();

// Sign-up
userRoute.post("/sign-up", userSignUp);
// Login
userRoute.post("/login", userLogin);
// Get Detail User
userRoute.get("/get-detail-user", getDetailUser);
// Get List Of Save Images
userRoute.get("/get-list-images", getListImages);
// Get List Of Make Images
userRoute.get("/get-list-images-make", getListImagesMake);
// Delete Image By Id_image
userRoute.delete("/delete-image/:hinh_id", deleteImage);
// Update User
// Update UserInfo
userRoute.put("/update-userinfo", updateUserinfo);
// Upload Avatar
userRoute.put(
  "/upload-avatar",
  grantToken,
  upload.single("file"),
  uploadAvatar
);

export default userRoute;
