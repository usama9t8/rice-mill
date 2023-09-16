import React from "react";
import Wrapper from "../assets/wrappers/DashbardHeaderWrapper";
import { Link } from "react-router-dom";

const DashboardHeader = ({ headerText, headerBtnText, headerBtnLink }) => {
  return (
    <Wrapper>
      <h1>{headerText}</h1>
      {headerBtnText && (
        <Link to={headerBtnLink} className="btn">
          {headerBtnText}
        </Link>
      )}
    </Wrapper>
  );
};

export default DashboardHeader;
