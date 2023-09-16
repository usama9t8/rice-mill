import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormWrapper";
import { FormRow, FormButton, SelectInput } from "../components";
import { EMPLOYEE_STATUS } from "../../../utils/constants.js";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, useLoaderData, redirect } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/employee/${params.id}`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/employees");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/employee/${params.id}`, data);
    toast.success("Employee Updated");
    return redirect("/dashboard/employees");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditEmployee = () => {
  const { employee } = useLoaderData();

  const date = day(employee.joiningDate).format("YYYY-MM-DD");

  return (
    <Wrapper>
      <Form method="post" className="form">
        <div className="form-header">
          <h1>Edit Employee</h1>
        </div>
        <div className="form-cont">
          <FormRow name="name" type="text" defaultValue={employee.name} req />
          <FormRow
            name="phoneNumber"
            labelText="phone number"
            type="text"
            defaultValue={employee.phoneNumber}
            req
          />

          <FormRow
            name="cnic"
            labelText="CNIC"
            type="text"
            defaultValue={employee.cnic}
          />
          <FormRow
            name="address"
            type="text"
            defaultValue={employee.address}
            req
          />

          <FormRow
            name="joiningDate"
            labelText="joining date"
            type="date"
            defaultValue={date}
            req
          />
          <FormRow
            name="salary"
            type="number"
            defaultValue={employee.salary}
            req
          />
          <SelectInput
            name="status"
            defaultValue={employee.status}
            options={Object.values(EMPLOYEE_STATUS)}
            req
          />
        </div>
        <div className="form-footer">
          <FormButton btnText="save" btnDisabledText="saving" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditEmployee;
