import { Box, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";

export default function AddStudent() {
  const [isPopUp, setIsPopUp] = useState(false);
  const openModal = () => {
    setIsPopUp(true);
    console.log(isPopUp);
  };
  const closeModal = () => {
    setIsPopUp(false);
  };

  return (
    <Box padding={1}>
      <Button variant="contained" color="success" onClick={openModal}>
        Add Student
        <AddCircleIcon sx={{ ml: 1 }} />
      </Button>
    </Box>
  );
}
