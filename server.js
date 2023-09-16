import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

//Routers
import AuthRouter from "./routes/authRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import EmployeeRouter from "./routes/employeeRoutes.js";

//Middlewares
import errorHandlerMiddleware from "./middlewares/ErrorhandlerMiddleware.js";
import { authenticationMiddleware } from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", authenticationMiddleware, UserRouter);
app.use("/api/v1/employee", authenticationMiddleware, EmployeeRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "Routes does not exists" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5200;

try {
  await mongoose.connect(process.env.URL);
  app.listen(port, () => {
    console.log(`server is listening at port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
