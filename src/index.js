import express from "express";
import rootRoute from "./routes/rootRoute.js";
import cors from "cors";

const app = express();

// Use middleware to convert data to json
app.use(express.json());
app.use(express.static("."));
app.use(cors());

// Khởi tạo server
app.listen(8080);

// Use route
app.use(rootRoute);
