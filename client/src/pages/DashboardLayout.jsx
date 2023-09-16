import React, { useEffect } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
  useLocation,
  useSubmit,
} from "react-router-dom";
import { useContext, useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Loading } from "../components";
import { BigSidebar, SmallSidebar, Navbar } from "../components";
import Wrapper from "../assets/wrappers/DashboardWrapper";

const DashboardContext = React.createContext();

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebar] = useState(false);
  const navigate = useNavigate();
  const navigation = useNavigation();
  // const submit = useSubmit();
  // const location = useLocation();
  const isLoading = navigation.state === "loading";

  const toggleSidebar = () => {
    setSidebar(!isSidebarOpen);
  };

  const logout = async () => {
    navigate("/login");
    await customFetch.get("/auth/logout");
    toast.success("Logout Successful");
  };

  //Automatically logout user after 10 mints of inactivity
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     submit(null, { method: "get", action: "/api/v1/auth/logout" });
  //   }, 1000 * 60);

  //   return () => clearTimeout(timer);
  // }, [submit, location]);

  const { user } = useLoaderData();
  return (
    <DashboardContext.Provider
      value={{
        user,
        isSidebarOpen,
        toggleSidebar,
        logout,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export default DashboardLayout;
