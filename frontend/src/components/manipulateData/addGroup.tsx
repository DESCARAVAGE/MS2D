import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";
import ModalFormGroup from "../manipulateData/ModalFormGroup";

export interface AddGroupProps {
  onUpdate?: () => void
}

export default function AddGroup({ onUpdate }: AddGroupProps ) {
  const [isPopUp, setIsPopUp] = useState(false);

  const openModal = () => {
    setIsPopUp(true);
  };

  const closeModal = () => {
    setIsPopUp(false);
  };

  return (
    <Box padding={1}>
      <Button variant="contained" color="success" onClick={openModal}>
        Add group
        <AddCircleIcon sx={{ ml: 1 }} />
      </Button>
      <Box>
        {isPopUp ? (
          <ModalFormGroup isOpen={isPopUp} onClose={closeModal} onUpdate={onUpdate}></ModalFormGroup>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}
