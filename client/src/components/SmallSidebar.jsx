import Wrapper from "../assets/wrappers/SmallSidebarWrapper";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import Links from "./Links";
import { useDashboardContext } from "../pages/DashboardLayout";
const SmallSidebar = () => {
  const { toggleSidebar, isSidebarOpen } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-cont ${isSidebarOpen && "show-sidebar"}`}>
        <div className="content-cont">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <Logo />
          <h4>dashboard</h4>
          <Links />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
