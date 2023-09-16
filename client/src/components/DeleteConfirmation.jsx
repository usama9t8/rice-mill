import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = ({ showModal, hideModal, message, confirmModal }) => {
  return (
    <Dialog
      open={showModal}
      onClose={hideModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <button className="btn btn-cancel" onClick={hideModal}>
          cancel
        </button>
        <button className="btn btn-del" onClick={confirmModal}>
          delete
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
