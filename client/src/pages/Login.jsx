import Wrapper from "../assets/wrappers/LoginWrapper";
import { Logo, FormRow, FormButton } from "../components";
import { Link, Form, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Login Successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  return (
    <Wrapper className="bcg">
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          name="email"
          defaultValue="hafizabdullah510@gmail.com"
          type="email"
          req
        />
        <FormRow name="password" defaultValue="secret123" type="password" req />
        <FormButton btnText="submit" btnDisabledText="submitting" btnBlock />

        <p>
          Forgot Password? <Link to="/forgot_password">click here</Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
