import express from "express";
import userRoute from "./userRoute.js";
import imageRoute from "./imageRoute.js";

const rootRoute = express.Router();

// Route for user
rootRoute.use("/user", userRoute);
// Route for image
rootRoute.use("/image", imageRoute);

export default rootRoute;
