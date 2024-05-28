import DisplayStudentsTab, { DisplayStudentsTabHandle } from "@/components/displayData/displayStudentsTab";
import StudentTable from "@/components/displayData/displayStudentsTab";
import AddStudent from "@/components/manipulateData/addStudent";
import NavBar from "@/components/navigation/Navbar";
import { Student } from "@/types/student.type";
import { Box, Grid } from "@mui/material";
import React, { useRef } from "react";

export default function Students() {
  const displayStudentsTabRef = useRef<DisplayStudentsTabHandle>(null);

  const handleUpdate = () => {
    if (displayStudentsTabRef.current) {
      displayStudentsTabRef.current.refetchData();
    }
  };

  return (
    <>
      <NavBar />
      <Box px={32}>
        <Box display={"flex"} justifyContent={"end"} mb={2}>
          <AddStudent onUpdate={handleUpdate} />
        </Box>
      </Box>
      <Box padding={5}>
        <DisplayStudentsTab ref={displayStudentsTabRef}/>
      </Box>
    </>
  );
}
