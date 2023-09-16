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
import { Link, useNavigate } from "react-router-dom";

const EditAttendanceTable = ({ attendanceRecords }) => {
  const [attendanceData, setAttendanceData] = useState(attendanceRecords);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!attendanceRecords) {
    attendanceRecords = [];
  }
  if (attendanceRecords.length === 0) {
    return <h4>No attendance Records</h4>;
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
                      defaultChecked={row.status === "P"}
                      onChange={() => handleChange(row.employee, "P")}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <input
                      type="radio"
                      name={`status${index}`}
                      value="A"
                      className="radio-absent"
                      defaultChecked={row.status === "A"}
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
        <Link to="/dashboard/attendance" className="btn">
          Go back
        </Link>
      </div>
    </>
  );
};

export default EditAttendanceTable;
