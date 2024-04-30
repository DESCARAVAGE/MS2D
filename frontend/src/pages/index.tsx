import React from "react";
import { Box } from "@mui/material";
import NavBar from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <>
    <NavBar />
      <Box sx={{ display: "flex" }}>
        <div>Home</div>
      </Box>
    </>
  );
}
