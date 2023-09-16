import { StatusCodes } from "http-status-codes";
import Employee from "../models/EmployeeModel.js";
import day from "dayjs";
import Attendance from "../models/EmployeeAttendance.js";
import moment from "moment";
import { BAD_REQUEST_ERROR } from "../errors/CustomErrors.js";

export const getAllEmployees = async (req, res) => {
  const { search, status, sort } = req.query;
  const queryObject = {};

  if (search) {
    queryObject.$or = [
      { name: { $regex: search, $options: "i" } },
      { address: { $regex: search, $options: "i" } },
      {
        cnic: { $regex: search },
      },
      {
        phoneNumber: { $regex: search },
      },
    ];
  }

  if (status && !(status === "all")) {
    queryObject.status = status;
  }

  const sortOptions = {
    latest: "-createdAt",
    oldest: "createdAt",
    "a-z": "name",
    "z-a": "-name",
  };

  const sortKey = sortOptions[sort] || sortOptions.latest;

  const employees = await Employee.find(queryObject).sort(sortKey);

  res.status(StatusCodes.OK).json({ employees });
};

export const createEmployee = async (req, res) => {
  req.body.joiningDate = day(req.body.joiningDate).toISOString();
  await Employee.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "Employee Created" });
};
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  await Employee.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "Employee updated!" });
};
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  await Attendance.deleteMany({ employee: id });
  await Employee.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "Employee Deleted!" });
};

export const getSingleEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ employee });
};

export const markAttendance = async (req, res) => {
  const { date, attendanceData } = req.body;
  // Check if attendance already exists for the given date
  const existingAttendance = await Attendance.findOne({ date });

  if (existingAttendance) {
    throw new BAD_REQUEST_ERROR("Attendance already marked for today!");
  }

  attendanceData.forEach(async (attendanceItem) => {
    const singleRecord = { ...attendanceItem, date };
    await Attendance.create(singleRecord);
  });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Attendance marked successfully" });
};

export const getAttendanceByDate = async (req, res) => {
  const date = req.params.date;
  const attendanceRecords = await Attendance.find({
    date: date,
  });
  res.status(StatusCodes.OK).json({ attendanceRecords });
};

export const employeeAttendanceStatus = async (req, res) => {
  const { name, month } = req.query;
  const check = moment(month);
  const yearMonth = check.format("M");
  const year = check.format("YYYY");
  const startDate = moment({ year: year, month: yearMonth - 1 }).add(1, "day");
  const endDate = moment({ year: year, month: yearMonth - 1, day: 1 }).endOf(
    "month"
  );

  const pipeline = [
    {
      $match: {
        date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
      },
    },
    {
      $group: {
        _id: {
          employeeId: "$employee",
          name: "$name",
          cnic: "$cnic",
        },

        totalAbsents: {
          $sum: { $cond: [{ $eq: ["$status", "A"] }, 1, 0] },
        },
        totalPresents: {
          $sum: { $cond: [{ $eq: ["$status", "P"] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        employeeId: "$_id.employeeId",
        employeeName: "$_id.name",
        cnic: "$_id.cnic",
        totalAbsents: 1,
        totalPresents: 1,
      },
    },
  ];

  if (name) {
    pipeline.push({
      $match: {
        employeeName: { $regex: name, $options: "i" },
      },
    });
  }
  const employeesAttendanceStatus = await Attendance.aggregate(pipeline);
  res.status(StatusCodes.OK).json({ employeesAttendanceStatus });
};

export const getAllAttendanceRecords = async (req, res) => {
  const startDate = moment().subtract("months").startOf("month");
  const endDate = moment().subtract("months").endOf("month");

  const employeeAttendances = await Attendance.aggregate([
    {
      $match: {
        date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
      },
    },
    {
      $group: {
        _id: { date: "$date", status: "$status" },
        count: { $sum: 1 },
      },
    },
  ]);
  employeeAttendances.sort((a, b) => {
    const dateA = new Date(a._id.date);
    const dateB = new Date(b._id.date);
    return dateB - dateA;
  });

  const attendanceSummary = employeeAttendances.reduce((summary, entry) => {
    const date = moment(entry._id.date).format("YYYY-MM-DD");
    const status = entry._id.status;
    const count = entry.count;

    if (!summary[date]) {
      summary[date] = { date };
    }
    summary[date][status] = count;

    return summary;
  }, {});
  res
    .status(StatusCodes.OK)
    .json({ attendanceData: Object.values(attendanceSummary) });
};

export const updateAttendance = async (req, res) => {
  const { attendanceData } = req.body;

  for (const attendanceItem of attendanceData) {
    const { date, status, employee } = attendanceItem;
    await Attendance.findOneAndUpdate(
      { date: date, employee: employee },
      { status: status },
      {
        runValidators: true,
        new: true,
      }
    );
  }
  res.status(StatusCodes.OK).json({ msg: "Attendance updated" });
};
