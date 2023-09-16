import express from "express";
import {
  getCurrentUser,
  updatePersonalInfo,
  updatePassword,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
} from "../controllers/userController.js";
import {
  validateUpdatePersonalInfoInput,
  validateUpdatePasswordInput,
  validateUserInput,
  validateUpdateUserInput,
  validateUserIdParam,
} from "../middlewares/validationMiddleware.js";
import { authorizePermission } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authorizePermission(["admin"]), validateUserInput, createUser);
router.get("/", authorizePermission(["admin"]), getAllUsers);
router.get(
  "/single-user/:id",
  authorizePermission(["admin"]),
  validateUserIdParam,
  getSingleUser
);
router.patch(
  "/update-user/:id",
  authorizePermission(["admin"]),
  validateUpdateUserInput,
  validateUserIdParam,
  updateUser
);
router.delete(
  "/delete-user/:id",
  authorizePermission(["admin"]),
  validateUserIdParam,
  deleteUser
);
router.get("/current-user", getCurrentUser);
router.patch(
  "/update-personalInfo",
  validateUpdatePersonalInfoInput,
  updatePersonalInfo
);
router.patch("/update-password", validateUpdatePasswordInput, updatePassword);

export default router;
