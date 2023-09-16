import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms, FaBars } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

const links = [
  {
    text: "stats",
    path: ".",
    icon: <IoBarChartSharp />,
  },

  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "employees information",
    path: "employees",
    icon: <BsFillPersonLinesFill />,
  },
  {
    text: "users",
    path: "users",
    icon: <FaUsers />,
  },
];

export default links;
