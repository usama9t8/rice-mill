import React, { useState } from "react";
import { DashboardHeader, MarkAttendanceTable, Loading } from "../components";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/employee");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const MarkAttendance = () => {
  const { employees } = useLoaderData();

  const activeEmployees = employees.filter((emp) => emp.status === "active");
  return (
    <>
      <DashboardHeader headerText="mark attendance" />

      <MarkAttendanceTable employees={activeEmployees} />
    </>
  );
};

export default MarkAttendance;
