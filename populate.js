import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/UserModel.js";
try {
  await mongoose.connect(process.env.URL);
  await User.create({
    firstName: "abdullah",
    lastName: "tariq",
    role: "admin",
    isDeleteable: false,
    email: "hafizabdullah510@gmail.com",
    password: "secret123",
  });

  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
