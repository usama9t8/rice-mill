import { body, param, validationResult } from "express-validator";
import {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
} from "../errors/CustomErrors.js";
import User from "../models/UserModel.js";
import { EMPLOYEE_STATUS } from "../utils/constants.js";
import mongoose from "mongoose";
import Employee from "../models/EmployeeModel.js";
import Attendance from "../models/EmployeeAttendance.js";

const validateErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        if (errorMessages[0].startsWith("no employee")) {
          throw new NOT_FOUND_ERROR(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UNAUTHORIZED_ERROR("not authorized to access the route");
        }
        throw new BAD_REQUEST_ERROR(errorMessages);
      }
      next();
    },
  ];
};

export const validateLoginInput = validateErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),

  body("password").notEmpty().withMessage("password is required"),
]);
export const validateUpdatePersonalInfoInput = validateErrors([
  body("firstName").notEmpty().withMessage("first name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),

  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BAD_REQUEST_ERROR("email already exists");
      }
    }),
]);

export const validateUpdateUserInput = validateErrors([
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
]);

export const validateUpdatePasswordInput = validateErrors([
  body("currentPassword").notEmpty().withMessage("currentPassword is required"),
  body("newPassword")
    .notEmpty()
    .withMessage("newPassword is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
]);

export const validateResetPasswordInput = validateErrors([
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
]);
export const validateUserInput = validateErrors([
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BAD_REQUEST_ERROR("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
]);

export const validateEmployeeInput = validateErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("phoneNumber").notEmpty().withMessage("phone number is required"),
  body("cnic").notEmpty().withMessage("cnic is required"),
  body("address").notEmpty().withMessage("address is required"),
  body("joiningDate").notEmpty().withMessage("joining date is required"),
  body("salary").notEmpty().withMessage("salary is required"),
  body("status")
    .isIn(Object.values(EMPLOYEE_STATUS))
    .withMessage("invalid status value"),
]);

export const validateIdParam = validateErrors([
  param("id").custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BAD_REQUEST_ERROR(`invalid mongoDb id`);
    const employee = await Employee.findById(value);
    if (!employee) throw new NOT_FOUND_ERROR(`no employee with id ${value}`);
  }),
]);

export const validateUserIdParam = validateErrors([
  param("id").custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BAD_REQUEST_ERROR(`invalid mongoDb id`);
    const user = await User.findById(value);
    if (!user) throw new NOT_FOUND_ERROR(`no user with id ${value}`);
  }),
]);
export const validateDateParam = validateErrors([
  param("date").custom(async (value, { req }) => {
    const attendance = await Attendance.find({ date: value });
    if (attendance.length === 0)
      throw new NOT_FOUND_ERROR(`no attendance on date ${value}`);
  }),
]);

export const validateAttendanceInput = validateErrors([
  body("date").notEmpty().withMessage("date is required"),
  body("attendanceData.*.status").notEmpty().withMessage("status is required"),
  body("attendanceData.*.name").notEmpty().withMessage("name is required"),
  body("attendanceData.*.cnic").notEmpty().withMessage("cnic is required"),
  body("attendanceData.*.employee")
    .notEmpty()
    .withMessage("employee id is required"),
]);

export const validateAttendanceUpdateInput = validateErrors([
  body("attendanceData.*.date")
    .notEmpty()
    .withMessage("date is required")
    .custom(async (value, { req }) => {
      const attendance = await Attendance.find({ date: value });
      if (attendance.length === 0)
        throw new NOT_FOUND_ERROR(`no attendance on date ${value}`);
    }),
  body("attendanceData.*.status").notEmpty().withMessage("status is required"),
  body("attendanceData.*.employee")
    .notEmpty()
    .withMessage("employee id is required")
    .custom(async (value, { req }) => {
      const isValid = mongoose.Types.ObjectId.isValid(value);
      if (!isValid) throw new BAD_REQUEST_ERROR(`invalid mongoDb id`);
      const employee = await Employee.find({ _id: value });
      if (employee.length === 0)
        throw new NOT_FOUND_ERROR(`no employee with id : ${value}`);
    }),
]);
