import React from "react";
import { DashboardHeader, EditAttendanceTable } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/employee/attendance/single-record/${params.date}`
    );
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/attendance");
  }
};
const EditAttendance = () => {
  const { attendanceRecords } = useLoaderData();
  console.log(attendanceRecords);
  return (
    <>
      <DashboardHeader headerText="Edit Attendance" />

      <EditAttendanceTable attendanceRecords={attendanceRecords} />
    </>
  );
};

export default EditAttendance;
