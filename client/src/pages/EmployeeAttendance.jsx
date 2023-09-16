import React from "react";
import { DashboardHeader, AttendanceTable } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/employee/attendance/all-record");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const EmployeeAttendance = () => {
  const { attendanceData } = useLoaderData();

  return (
    <>
      <DashboardHeader
        headerText="Attendance"
        headerBtnText="mark attendance"
        headerBtnLink="/dashboard/mark-attendance"
      />

      <AttendanceTable attendanceData={attendanceData} />
    </>
  );
};

export default EmployeeAttendance;
