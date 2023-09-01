import React from "react";
import Navbar from "../components/slider/Navbar";
import Sidenav from "../components/slider/Sidenav";
import { Box } from "@mui/material";
const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
