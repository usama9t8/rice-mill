import mongoose from "mongoose";
import { EMPLOYEE_STATUS } from "../utils/constants.js";
import Attendance from "./EmployeeAttendance.js";
const employeeSchema = new mongoose.Schema(
  {
    name: String,
    phoneNumber: String,
    cnic: String,
    address: String,
    joiningDate: Date,
    salary: Number,
    status: {
      type: String,
      default: EMPLOYEE_STATUS.ACTIVE,
    },
  },
  { timestamps: true }
);

export default mongoose.model("employee", employeeSchema);
