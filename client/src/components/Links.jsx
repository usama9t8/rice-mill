import React, { useRef, useState } from "react";
import navLinks from "../utils/links";
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/LinksWrapper";
import { useDashboardContext } from "../pages/DashboardLayout";
import { AiFillCaretDown } from "react-icons/ai";
const Links = ({ BigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  const [showLinks, setShowLinks] = useState(false);
  const linksRef = useRef(null);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const linksStyle = {
    height: showLinks
      ? `${linksRef.current.getBoundingClientRect().height}px`
      : "0px",
  };
  return (
    <Wrapper>
      <div className="dashboard-links">
        {navLinks.map((link, index) => {
          const { text, path, icon } = link;
          if (path === "users" && !(user.role === "admin")) return;
          if (path === "employees") {
            return (
              <div key={index}>
                <div className="links-header">
                  <div className="left-header-section">
                    <span>{icon}</span>
                    Employees
                  </div>
                  <AiFillCaretDown
                    onClick={toggleLinks}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="links-cont" style={linksStyle}>
                  <div className="nav-links" ref={linksRef}>
                    <NavLink
                      to={path}
                      end
                      onClick={!BigSidebar && toggleSidebar}
                    >
                      {text}
                    </NavLink>
                    <NavLink
                      to="attendance"
                      end
                      onClick={!BigSidebar && toggleSidebar}
                    >
                      employees attendance
                    </NavLink>
                    <NavLink
                      to="attendance-status"
                      end
                      onClick={!BigSidebar && toggleSidebar}
                    >
                      Attendance status
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <NavLink
              to={path}
              key={index}
              end
              onClick={!BigSidebar && toggleSidebar}
            >
              <span>{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Links;
