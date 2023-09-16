import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  if (window.location.href === "http://localhost:5174/") {
    // Redirect to localhost:5174/login
    window.location.href = "http://localhost:5174/login";
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default HomeLayout;
