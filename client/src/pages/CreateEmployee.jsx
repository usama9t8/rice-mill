import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormWrapper";
import { FormRow, FormButton, SelectInput } from "../components";
import { EMPLOYEE_STATUS } from "../../../utils/constants.js";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post(`/employee`, data);
    toast.success("Employee Created");
    return redirect("/dashboard/employees");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const CreateEmployee = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <div className="form-header">
          <h1>Create Employee</h1>
        </div>
        <div className="form-cont">
          <FormRow name="name" type="text" req />
          <FormRow
            name="phoneNumber"
            labelText="phone number"
            type="text"
            req
          />

          <FormRow name="cnic" labelText="CNIC" type="text" req />
          <FormRow name="address" type="text" req />

          <FormRow
            name="joiningDate"
            labelText="joining date"
            type="date"
            req
          />
          <FormRow name="salary" type="number" req />
          <SelectInput
            name="status"
            defaultValue={EMPLOYEE_STATUS.ACTIVE}
            options={Object.values(EMPLOYEE_STATUS)}
            req
          />
        </div>
        <div className="form-footer">
          <FormButton btnText="create" btnDisabledText="creating" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default CreateEmployee;
