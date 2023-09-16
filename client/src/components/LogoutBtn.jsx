import React, { useState } from "react";
import Wrapper from "../assets/wrappers/LogoutBtnWrapper";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useDashboardContext } from "../pages/DashboardLayout";
const LogoutBtn = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useDashboardContext();
  return (
    <Wrapper>
      <button
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        {user.firstName}
        <FaCaretDown />
      </button>
      <button
        className={`logout ${showLogout && "show-logout"}`}
        onClick={logout}
      >
        logout
      </button>
    </Wrapper>
  );
};

export default LogoutBtn;
