import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./TablePaginationActions";
import { Link } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);
import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const AttendanceTable = ({ attendanceData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - attendanceData.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (!attendanceData) {
    attendanceData = [];
  }

  if (attendanceData?.length === 0) {
    return (
      <>
        <h4>No Attendance Record</h4>
      </>
    );
  }
  return (
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
                Date
              </TableCell>
              <TableCell
                style={{
                  color: "var(--grey-500)",

                  fontWeight: "bold",
                }}
                align="left"
              >
                Day
              </TableCell>
              <TableCell
                style={{
                  color: "var(--grey-500)",

                  fontWeight: "bold",
                }}
                align="left"
              >
                Total Presents
              </TableCell>
              <TableCell
                style={{
                  color: "var(--grey-500)",

                  fontWeight: "bold",
                }}
                align="left"
              >
                Total Absents
              </TableCell>
              <TableCell
                style={{
                  color: "var(--grey-500)",

                  fontWeight: "bold",
                }}
                align="left"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? attendanceData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : attendanceData
            ).map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                  {day(row.date).format("dddd")}
                </TableCell>
                <TableCell align="left">
                  <div className="present-cell">
                    {row.P || 0}
                    {row.P && <div className="circle present-circle"></div>}
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div className="absent-cell">
                    {row.A || 0}
                    {row.A && <div className="circle absent-circle"></div>}
                  </div>
                </TableCell>
                <TableCell align="left">
                  <Link
                    to={`/dashboard/view-attendance/${row.date}`}
                    className="action-btn"
                  >
                    <span className="action-btn-span">
                      <FaEye color="var(--primary-500)" />
                    </span>
                  </Link>
                  <Link
                    to={`/dashboard/edit-attendance/${row.date}`}
                    className="action-btn"
                  >
                    <span className="action-btn-span">
                      <FaEdit color="var(--green-dark)" />
                    </span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={100} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          count={attendanceData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </Paper>
  );
};

export default AttendanceTable;
