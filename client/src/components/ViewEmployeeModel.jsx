import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Wrapper from "../assets/wrappers/DashboardFormWrapper";
import DialogTitle from "@mui/material/DialogTitle";
import { FormRow, SelectInput, Loading } from ".";
import { EMPLOYEE_STATUS } from "../../../utils/constants";
import { Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Button, DialogActions } from "@mui/material";
day.extend(advancedFormat);

const ViewModal = ({ showModal, hideModal, employee }) => {
  const { name, phoneNumber, cnic, address, joiningDate, salary, status } =
    employee;
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={showModal}
      onClose={hideModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Employee Information</DialogTitle>
      <DialogContent>
        <Wrapper>
          <Form method="post" className="form" style={{ boxShadow: "none" }}>
            <div className="form-cont">
              <FormRow name="name" type="text" defaultValue={name} />
              <FormRow
                name="phoneNumber"
                labelText="phone number"
                type="text"
                defaultValue={phoneNumber}
              />

              <FormRow
                name="cnic"
                labelText="CNIC"
                type="text"
                defaultValue={cnic}
              />
              <FormRow name="address" type="text" defaultValue={address} />
              <FormRow
                name="joiningDate"
                labelText="joining date"
                type="text"
                defaultValue={day(joiningDate).format("YYYY-MM-DD")}
              />
              <FormRow name="salary" type="number" defaultValue={salary} />
              <FormRow name="status" type="text" defaultValue={status} />
            </div>
          </Form>
        </Wrapper>
      </DialogContent>
      <DialogActions>
        <Button className="btn" type="button" onClick={hideModal}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
