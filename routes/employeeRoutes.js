import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
  getSingleEmployee,
  markAttendance,
  getAttendanceByDate,
  getAllAttendanceRecords,
  updateAttendance,
  employeeAttendanceStatus,
} from "../controllers/EmployeeController.js";
import {
  validateEmployeeInput,
  validateIdParam,
  validateAttendanceInput,
  validateDateParam,
  validateAttendanceUpdateInput,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/", validateEmployeeInput, createEmployee);
router.patch("/:id", validateEmployeeInput, validateIdParam, updateEmployee);
router.delete("/:id", validateIdParam, deleteEmployee);
router.get("/", getAllEmployees);
router.get("/:id", validateIdParam, getSingleEmployee);
router.post("/attendance", validateAttendanceInput, markAttendance);
router.get(
  "/attendance/single-record/:date",
  validateDateParam,
  getAttendanceByDate
);
router.get("/attendance/all-record", getAllAttendanceRecords);
router.patch(
  "/attendance/update-attendance",
  validateAttendanceUpdateInput,
  updateAttendance
);
router.get("/attendance/attendance-status", employeeAttendanceStatus);

export default router;
