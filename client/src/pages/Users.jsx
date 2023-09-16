import React from "react";
import { DashboardHeader, UsersTable, SearchContainer } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/user");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard");
  }
};

const Users = () => {
  const { filteredUsers } = useLoaderData();

  return (
    <>
      <DashboardHeader
        headerText="Users"
        headerBtnText="create user"
        headerBtnLink="/dashboard/create-user"
      />
      <UsersTable users={filteredUsers} />
    </>
  );
};

export default Users;
