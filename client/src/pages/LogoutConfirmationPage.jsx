import React from "react";
import Wrapper from "../assets/wrappers/LogoutConfirmationPage.jsx";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const logoutFromOtherDevices = async (navigate) => {
  try {
    await customFetch.get("/auth/user/logout-confirm");
    toast.success("Logout Successful. Please Login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  navigate("/");
};

const LogoutConfirmationPage = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="logout-cont">
        <h4>Do you want to logout from other devices?</h4>
        <button
          type="button"
          className="btn yes-btn"
          onClick={() => logoutFromOtherDevices(navigate)}
        >
          yes
        </button>
        <button
          type="button"
          className="btn no-btn"
          onClick={() => navigate("/")}
        >
          no
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutConfirmationPage;
