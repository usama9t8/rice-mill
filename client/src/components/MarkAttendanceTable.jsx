import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);
import { useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { Form, useNavigate } from "react-router-dom";
import moment from "moment";

const MarkAttendanceTable = ({ employees }) => {
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState(
    employees.map((emp) => {
      const attendance = {
        name: emp.name,
        cnic: emp.cnic,
        employee: emp._id,
        status: "P",
      };
      return attendance;
    })
  );

  const navigate = useNavigate();
  const submitAttendance = async () => {
    setLoading(true);
    const date = moment().format("YYYY-MM-DD");
    try {
      await customFetch.post("/employee/attendance", {
        date,
        attendanceData,
      });
      setLoading(false);
      toast.success("Attendance submitted");
      navigate("/dashboard/attendance");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      navigate("/dashboard/attendance");
      setLoading(false);
      return error;
    }
  };

  const handleChange = (employeeId, status) => {
    const updatedAttendanceData = attendanceData.map((item) => {
      console.log(item.employee, employeeId);

      if (item.employee === employeeId) {
        return { ...item, status: status };
      }
      return item;
    });
    setAttendanceData(updatedAttendanceData);
  };

  if (!employees) {
    employees = [];
  }
  if (employees.length === 0) {
    return <h4>No Employees Registered OR No Active Employees</h4>;
  }

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table sx={{ minWidth: 1050 }} aria-label="custom pagination table">
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "var(--grey-100)",
              }}
            >
              <TableRow>
                <TableCell
                  style={{
                    color: "var(--grey-500)",

                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--grey-500)",

                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  CNIC
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--grey-500)",

                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  Present
                </TableCell>
                <TableCell
                  style={{
                    color: "var(--grey-500)",

                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  Absent
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.cnic}</TableCell>
                  <TableCell align="left">
                    <input
                      type="radio"
                      name={`status${index}`}
                      value="P"
                      className="radio-present"
                      defaultChecked
                      onChange={() => handleChange(row.employee, "P")}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <input
                      type="radio"
                      name={`status${index}`}
                      value="A"
                      className="radio-absent"
                      onChange={() => handleChange(row.employee, "A")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className="submit-attendance-btn-cont">
        <Form>
          <button
            className="btn"
            type="button"
            onClick={submitAttendance}
            disabled={loading}
          >
            {loading ? "submitting" : "submit"}
          </button>
        </Form>
      </div>
    </>
  );
};

export default MarkAttendanceTable;
