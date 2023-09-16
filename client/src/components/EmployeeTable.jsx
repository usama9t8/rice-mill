import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./TablePaginationActions";
import { Link, useNavigate, redirect } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);
import DeleteConfirmation from "./DeleteConfirmation";
import ViewModal from "./ViewEmployeeModel";
import { useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const EmployeeTable = ({ employees }) => {
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayViewModel, setDisplayViewModal] = useState(false);
  const [employee, setEmployee] = useState({});
  const [deleteMessage, setDeleteMessage] = useState(null);
  const navigate = useNavigate();
  const showDeleteModal = (id) => {
    setId(id);

    setDeleteMessage(`Are you sure you want to delete the Employee?`);

    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayViewModal(false);
    setDisplayConfirmationModal(false);
  };

  const deleteEmployee = async () => {
    setDisplayConfirmationModal(false);
    try {
      await customFetch.delete(`/employee/${id}`);
      toast.success("Employee Deleted Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    navigate("/dashboard/employees");
  };

  const viewEmployee = async (id) => {
    setId(id);
    setDisplayViewModal(true);
    const employee = employees.find((emp) => emp._id === id);
    setEmployee(employee);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!employees) {
    employees = [];
  }
  if (employees?.length === 0) {
    return (
      <>
        <h4>No Employees to Display!</h4>
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
                  fontWeight: "bold",
                  color: "var(--grey-500)",
                }}
              >
                Name
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  color: "var(--grey-500)",
                }}
                align="left"
              >
                Phone Number
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  color: "var(--grey-500)",
                }}
                align="left"
              >
                CNIC
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  color: "var(--grey-500)",
                }}
                align="left"
              >
                Address
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  color: "var(--grey-500)",
                }}
                align="left"
              >
                Joining Date
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  color: "var(--grey-500)",
                }}
                align="left"
              >
                Salary
              </TableCell>
              <TableCell
                style={{
                  color: "var(--grey-500)",
                  fontWeight: "bold",
                }}
                align="left"
              >
                Status
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  color: "var(--grey-500)",
                }}
                align="left"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? employees.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : employees
            ).map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name.length > 17
                    ? `${row.name.substring(0, 14)}...`
                    : row.name}
                </TableCell>
                <TableCell align="left">{row.phoneNumber}</TableCell>
                <TableCell align="left">{row.cnic}</TableCell>
                <TableCell align="left">
                  {row.address.length > 15
                    ? `${row.address.substring(0, 12)}...`
                    : row.address}
                </TableCell>
                <TableCell align="left">
                  {day(row.joiningDate).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="left">{row.salary}</TableCell>
                <TableCell align="left">
                  {row.status === "active" ? (
                    <AiOutlineCheckCircle
                      fontSize={18}
                      color="var(--green-dark)"
                    />
                  ) : (
                    <AiOutlineCloseCircle
                      fontSize={18}
                      color="var(--red-dark)"
                    />
                  )}
                </TableCell>
                <TableCell align="left">
                  <button
                    type="button"
                    className="action-btn"
                    onClick={() => viewEmployee(row._id)}
                  >
                    <span className="action-btn-span">
                      <FaEye color="var(--primary-500)" />
                    </span>
                  </button>
                  <Link
                    to={`/dashboard/edit-employee/${row._id}`}
                    className="action-btn"
                  >
                    <span className="action-btn-span action-span-link">
                      <FaEdit color="var(--green-dark)" />
                    </span>
                  </Link>
                  <button
                    type="button"
                    className="action-btn"
                    onClick={() => showDeleteModal(row._id)}
                  >
                    <span className="action-btn-span">
                      <FaTrash color="var(--red-dark)" />
                    </span>
                  </button>
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
        <DeleteConfirmation
          showModal={displayConfirmationModal}
          hideModal={hideConfirmationModal}
          message={deleteMessage}
          confirmModal={deleteEmployee}
        />
        <ViewModal
          showModal={displayViewModel}
          hideModal={hideConfirmationModal}
          employee={employee}
        />
      </TableContainer>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          count={employees.length}
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

export default EmployeeTable;
