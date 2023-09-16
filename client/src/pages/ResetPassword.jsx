import React from "react";
import Wrapper from "../assets/wrappers/LoginWrapper";
import { FormRow, FormButton } from "../components";
import { Form, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    await customFetch.get("/user/current-user");
    return redirect("/dashboard");
  } catch (error) {
    return error;
  }
};

export const action = async ({ request }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const email = url.searchParams.get("email");
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const resetData = { ...data, token, email };
  try {
    await customFetch.post("/auth/user/reset-password", resetData);
    toast.success("Password Reset Successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ResetPassword = () => {
  return (
    <Wrapper className="bcg">
      <Form method="post" className="form">
        <h4>Reset Password</h4>
        <FormRow name="password" defaultValue="secret123" type="password" req />
        <FormButton btnText="reset" btnDisabledText="resetting" btnBlock />
      </Form>
    </Wrapper>
  );
};

export default ResetPassword;
