import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/material";
import { ThemeContext } from "@emotion/react";

interface ConfirmationProps {
  onConfirm: () => void;
}

const ConfirmChose: React.FC<ConfirmationProps> = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Delete Group
        <DeleteForeverIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm your chose"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to permanently delete the item, are you sure?
          </DialogContentText>
        </DialogContent>
          <Box display={"flex"} justifyContent={"space-between"} p={3}>
            <Button variant="outlined" color="success" onClick={handleClose}>No, I keep it</Button>
            <Button variant="contained" color="error" onClick={onConfirm} autoFocus>
              Yes ! I'm sure
            </Button>
          </Box>
        
      </Dialog>
    </>
  );
};

export default ConfirmChose;
