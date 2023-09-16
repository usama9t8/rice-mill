import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  name: String,
  cnic: String,
  date: Date,
  status: {
    type: String,
    enum: ["P", "A"],
  },
  employee: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
});

export default mongoose.model("Attendance", attendanceSchema);
