import Wrapper from "../assets/wrappers/LoginWrapper";
import { Logo, FormRow, FormButton } from "../components";
import { Link, Form, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registered Successfully");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          name="firstName"
          defaultValue="abdullah"
          type="text"
          labelText="first name"
          req
        />
        <FormRow
          name="lastName"
          defaultValue="tariq"
          type="text"
          labelText="last name"
          req
        />
        <FormRow
          name="email"
          defaultValue="hafizabdullah510@gmail.com"
          type="email"
          req
        />

        <FormRow name="password" defaultValue="secret123" type="password" req />
        <FormButton btnText="submit" />
        <p>
          Already registered? <Link to="/">Login</Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
