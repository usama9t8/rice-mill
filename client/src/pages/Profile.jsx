import {
  Form,
  redirect,
  useOutletContext,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormWrapper";
import { FormRow, FormButton } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { DashboardHeader } from "../components";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  let intent = formData.get("intent");
  if (intent === "save") {
    try {
      await customFetch.patch("/user/update-personalInfo", data);
      toast.success("Saved Successfully");
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  }

  if (intent === "update") {
    const { newPassword, confirmPassword } = data;
    if (!(newPassword === confirmPassword)) {
      toast.error("Both passwords should match");
      return redirect("/dashboard/profile");
    }

    try {
      await customFetch.patch("/user/update-password", data);
      toast.success("Password Updated Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard/profile");
  }
};

const Profile = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <DashboardHeader headerText="profile" />
      <Wrapper>
        <Form method="post" className="form">
          <div className="form-header">
            <h1>Profile Information</h1>
            <p>Update your account's profile information</p>
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
              defaultValue={user.phoneNumber || ""}
            />
            <FormRow
              name="cnic"
              labelText="CNIC"
              type="text"
              defaultValue={user.cnic || ""}
            />

            <FormRow name="email" type="email" defaultValue={user.email} req />
          </div>
          <div className="form-footer">
            <FormButton
              btnText="save"
              btnDisabledText="saving"
              name="intent"
              value="save"
            />
          </div>
        </Form>
      </Wrapper>

      <Wrapper>
        <Form method="post" className="form">
          <div className="form-header">
            <h1>Update Password</h1>
            <p>
              Ensure your account is using a long random password to stay secure
            </p>
          </div>

          <div className="form-cont">
            <FormRow
              name="currentPassword"
              labelText="current password"
              type="password"
              req
            />
            <FormRow
              name="newPassword"
              labelText="new password"
              type="password"
              req
            />
            <FormRow
              name="confirmPassword"
              labelText="confirm password"
              type="password"
              req
            />
          </div>
          <div className="form-footer">
            <button
              className="btn"
              type="submit"
              disabled={isSubmitting}
              name="intent"
              value="update"
            >
              {isSubmitting ? `updating` : `update`}
            </button>
          </div>
        </Form>
      </Wrapper>
    </>
  );
};

export default Profile;
