import StudentTable from "@/components/displayData/displayStudentsTab";
import AddStudent from "@/components/manipulateData/addStudent";
import NavBar from "@/components/navigation/Navbar";
import { Box } from "@mui/material";
import React from "react";

export default function Students() {
  return (
    <>
      <NavBar />
      <AddStudent />
      <StudentTable />
    </>
  );
}
