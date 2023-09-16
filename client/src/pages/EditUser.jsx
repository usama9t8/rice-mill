import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormWrapper";
import { FormRow, FormButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, useLoaderData, redirect } from "react-router-dom";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/user/single-user/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    if (error?.response?.data?.msg.startsWith("not authorized")) {
      return redirect("/dashboard");
    }
    return redirect("/dashboard/users");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/user/update-user/${params.id}`, data);
    toast.success("User Updated");
    return redirect("/dashboard/users");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditUser = () => {
  const { user } = useLoaderData();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <div className="form-header">
          <h4>Edit User</h4>
        </div>
        <div className="form-cont">
          <FormRow
            name="firstName"
            labelText="first name"
            type="text"
            defaultValue={user.firstName}
            req
          />
          <FormRow
            name="lastName"
            labelText="last name"
            type="text"
            defaultValue={user.lastName}
            req
          />
          <FormRow
            name="phoneNumber"
            labelText="phone number"
            type="text"
            defaultValue={user.phoneNumber}
          />

          <FormRow
            name="cnic"
            labelText="CNIC"
            type="text"
            defaultValue={user.cnic}
          />
        </div>
        <div className="form-footer">
          <FormButton btnText="save" btnDisabledText="saving" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditUser;
