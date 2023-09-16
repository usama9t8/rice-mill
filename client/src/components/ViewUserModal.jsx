import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Wrapper from "../assets/wrappers/DashboardFormWrapper";
import DialogTitle from "@mui/material/DialogTitle";
import { FormRow } from ".";
import { Form } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Button, DialogActions } from "@mui/material";
day.extend(advancedFormat);

const ViewUserModal = ({ showModal, hideModal, user }) => {
  const { firstName, lastName, phoneNumber, cnic, email } = user;
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={showModal}
      onClose={hideModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">User Information</DialogTitle>
      <DialogContent>
        <Wrapper>
          <Form method="post" className="form" style={{ boxShadow: "none" }}>
            <div className="form-cont">
              <FormRow name="name" type="text" defaultValue={firstName} />
              <FormRow
                name="phoneNumber"
                labelText="phone number"
                type="text"
                defaultValue={lastName}
              />

              <FormRow
                name="cnic"
                labelText="CNIC"
                type="text"
                defaultValue={cnic}
              />
              <FormRow name="address" type="text" defaultValue={email} />

              <FormRow name="status" type="text" defaultValue={phoneNumber} />
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

export default ViewUserModal;
