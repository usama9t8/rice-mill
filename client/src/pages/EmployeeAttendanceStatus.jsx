import React from "react";
import {
  DashboardHeader,
  EmployeesAttendanceStatusTable,
  AttendanceSearchContainer,
} from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get(
      "/employee/attendance/attendance-status",
      { params }
    );
    return { data, params };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const EmployeeAttendanceStatus = () => {
  const { data, params } = useLoaderData();

  return (
    <>
      <DashboardHeader headerText="Attendance Status" />
      <AttendanceSearchContainer params={params} />
      <EmployeesAttendanceStatusTable
        employeesAttendanceStatus={data.employeesAttendanceStatus}
      />
    </>
  );
};

export default EmployeeAttendanceStatus;
