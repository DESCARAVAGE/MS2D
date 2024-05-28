import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";
import ModalFormStudents from "./ModalFormStudent";

interface AddStudentProps {
  onUpdate?: () => void;
}

export default function AddStudent({ onUpdate }: AddStudentProps) {
  const [isPopUp, setIsPopUp] = useState(false);
  
  const openModal = () => {
    setIsPopUp(true);
  };

  const closeModal = () => {
    setIsPopUp(false);
    if (onUpdate) {
      onUpdate();
    }
  };

  return (
    <Box padding={1}>
      <Button variant="contained" color="success" onClick={openModal}>
        Add Student
        <AddCircleIcon sx={{ ml: 1 }} />
      </Button>
      <Box>
        {isPopUp ? (
          <ModalFormStudents isOpen={isPopUp} onClose={closeModal} ></ModalFormStudents>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}
