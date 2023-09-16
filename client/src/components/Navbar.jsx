import Wrapper from "../assets/wrappers/NavbarWrapper";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import LogoutBtn from "./LogoutBtn";
import { useDashboardContext } from "../pages/DashboardLayout";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="fa-bars" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>

        <h4 className="logo-text">dashboard</h4>
        <div className="logout-btn-cont">
          <LogoutBtn />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
