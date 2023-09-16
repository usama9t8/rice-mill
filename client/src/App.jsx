import {
  Login,
  HomeLayout,
  ForgotPassword,
  Error,
  ResetPassword,
  DashboardLayout,
  Stats,
  Profile,
  Employee,
  Users,
  EditEmployee,
  CreateEmployee,
  CreateUser,
  EditUser,
  EmployeeAttendance,
  MarkAttendance,
  EditAttendance,
  EmployeeAttendanceStatus,
  ViewAttendance,
} from "./pages";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//loaders and actions
import { loader as DashboardLoader } from "./pages/DashboardLayout";
import { loader as EmployeesLoader } from "./pages/Employee";
import { loader as UsersLoader } from "./pages/Users";
import { loader as SingleEmployeeLoader } from "./pages/EditEmployee";
import { loader as SingleUserLoader } from "./pages/EditUser";
import { loader as CreateUserLoader } from "./pages/CreateUser";
import { loader as MarkAttendanceLoader } from "./pages/MarkAttendance";
import { loader as GetAttendanceLoader } from "./pages/EmployeeAttendance";
import { loader as EditAttendanceLoader } from "./pages/EditAttendance";
import { loader as ViewAttendanceLoader } from "./pages/ViewAttendance";
import { loader as AttendanceStatusLoader } from "./pages/EmployeeAttendanceStatus";
import { action as LoginAction } from "./pages/Login";
import { action as forgotPasswordAction } from "./pages/ForgotPassword";
import { action as resetPasswordAction } from "./pages/ResetPassword";
import { action as personalInfoAction } from "./pages/Profile";
import { action as EditEmployeeAction } from "./pages/EditEmployee";
import { action as EditUserAction } from "./pages/EditUser";
import { action as CreateEmployeeAction } from "./pages/CreateEmployee";
import { action as CreateUserAction } from "./pages/CreateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
      },
      {
        path: "forgot_password",
        element: <ForgotPassword />,
        action: forgotPasswordAction,
      },
      {
        path: "user/reset_password",
        element: <ResetPassword />,
        action: resetPasswordAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: DashboardLoader,
        children: [
          {
            index: true,
            element: <Stats />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: personalInfoAction,
          },
          {
            path: "employees",
            element: <Employee />,
            loader: EmployeesLoader,
          },
          {
            path: "users",
            element: <Users />,
            loader: UsersLoader,
          },
          {
            path: "create-employee",
            element: <CreateEmployee />,
            action: CreateEmployeeAction,
          },
          {
            path: "edit-employee/:id",
            element: <EditEmployee />,
            loader: SingleEmployeeLoader,
            action: EditEmployeeAction,
          },
          {
            path: "edit-user/:id",
            element: <EditUser />,
            loader: SingleUserLoader,
            action: EditUserAction,
          },
          {
            path: "create-user",
            element: <CreateUser />,
            action: CreateUserAction,
            loader: CreateUserLoader,
          },
          {
            path: "attendance",
            element: <EmployeeAttendance />,
            loader: GetAttendanceLoader,
          },
          {
            path: "mark-attendance",
            element: <MarkAttendance />,
            loader: MarkAttendanceLoader,
          },
          {
            path: "edit-attendance/:date",
            element: <EditAttendance />,
            loader: EditAttendanceLoader,
          },
          {
            path: "view-attendance/:date",
            element: <ViewAttendance />,
            loader: ViewAttendanceLoader,
          },
          {
            path: "attendance-status",
            element: <EmployeeAttendanceStatus />,
            loader: AttendanceStatusLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
