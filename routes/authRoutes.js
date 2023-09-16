import express from "express";
import {
  login,
  forgot_password,
  resetPassword,
  logout,
} from "../controllers/authController.js";
import {
  validateLoginInput,
  validateResetPasswordInput,
} from "../middlewares/validationMiddleware.js";
const router = express.Router();

router.post("/login", validateLoginInput, login);
router.get("/logout", logout);
router.post("/forgot-password", forgot_password);
router.post("/user/reset-password", validateResetPasswordInput, resetPassword);
// router.get("/user/logout-confirm", logoutFromOtherDevices);

export default router;
