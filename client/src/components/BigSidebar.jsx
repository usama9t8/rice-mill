import Wrapper from "../assets/wrappers/BigSidebarWrapper";
import Links from "./Links";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
const BigSidebar = () => {
  const { isSidebarOpen } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-cont ${!isSidebarOpen && "show-sidebar"}`}>
        <div className="content">
          <header>
            <Logo />
            <h1>hamza awais rice mill</h1>
          </header>
          <Links BigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
