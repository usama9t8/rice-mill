import React from "react";
import { DashboardHeader, EmployeeTable, SearchContainer } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/employee", { params });
    return { data, params };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Employee = () => {
  const { data, params } = useLoaderData();
  return (
    <>
      <DashboardHeader
        headerText="Employees"
        headerBtnText="create employee"
        headerBtnLink="/dashboard/create-employee"
      />
      <SearchContainer params={params} />
      <EmployeeTable employees={data.employees} />
    </>
  );
};

export default Employee;
