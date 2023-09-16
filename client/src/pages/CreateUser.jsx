import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormWrapper";
import { FormRow, FormButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  const data = {
    firstName: JSON.parse(localStorage.getItem("firstName")),
    lastName: JSON.parse(localStorage.getItem("lastName")),
    phoneNumber: JSON.parse(localStorage.getItem("phoneNumber")),
    cnic: JSON.parse(localStorage.getItem("cnic")),
    email: JSON.parse(localStorage.getItem("email")),
  };
  return data;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  localStorage.setItem("firstName", JSON.stringify(data.firstName));
  localStorage.setItem("lastName", JSON.stringify(data.lastName));
  localStorage.setItem("phoneNumber", JSON.stringify(data.phoneNumber));
  localStorage.setItem("cnic", JSON.stringify(data.cnic));
  localStorage.setItem("email", JSON.stringify(data.email));
  try {
    await customFetch.post(`/user`, data);
    toast.success("User Created");
    localStorage.clear("firstName");
    localStorage.clear("lastName");
    localStorage.clear("phoneNumber");
    localStorage.clear("cnic");
    localStorage.clear("email");
    return redirect("/dashboard/users");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    if (error?.response?.data?.msg.startsWith("not authorized")) {
      return redirect("/dashboard");
    }
    return error;
  }
};

const CreateEmployee = () => {
  const userData = useLoaderData();
  return (
    <Wrapper>
      <Form method="post" className="form">
        <div className="form-header">
          <h1>Create User</h1>
        </div>
        <div className="form-cont">
          <FormRow
            name="firstName"
            labelText="first name"
            defaultValue={userData.firstName}
            type="text"
            req
          />
          <FormRow
            name="lastName"
            labelText="last name"
            defaultValue={userData.lastName}
            type="text"
            req
          />
          <FormRow
            name="phoneNumber"
            labelText="phone number"
            defaultValue={userData.phoneNumber}
            type="text"
          />

          <FormRow
            name="cnic"
            labelText="CNIC"
            type="text"
            defaultValue={userData.cnic}
          />

          <FormRow
            name="email"
            type="email"
            req
            defaultValue={userData.email}
          />

          <FormRow name="password" type="password" req />
        </div>
        <div className="form-footer">
          <FormButton btnText="create" btnDisabledText="creating" formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default CreateEmployee;
