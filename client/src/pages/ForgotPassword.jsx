import Wrapper from "../assets/wrappers/LoginWrapper";
import { FormRow, FormButton } from "../components";
import { Link, Form, redirect } from "react-router-dom";
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
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/forgot-password", data);
    toast.success("Please check your email to reset password");
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ForgotPassword = () => {
  return (
    <Wrapper className="bcg">
      <Form method="post" className="form">
        <h4>Forgot Password</h4>

        <FormRow name="email" defaultValue="a@z.com" type="email" req />
        <FormButton btnText="submit" btnDisabledText="submitting" btnBlock />

        <p>
          <Link to="/login">Go Back</Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default ForgotPassword;
