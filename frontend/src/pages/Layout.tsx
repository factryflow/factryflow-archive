import React from "react";
import Navbar from "../components/slider/Navbar";
import Sidenav from "../components/slider/Sidenav";
import { Box } from "@mui/material";

const Layout = ({ children }: any) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" className="main">
          <Navbar />
          <div className="main-content">{children}</div>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
