import React from "react";
import { useAppSelector } from "../app/hooks";
import { logout, selectAuth } from "@/redux/features/authSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Layout from "./Layout";
const Dashboard = () => {
  // const { name } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography>Welcome To Dashboard</Typography>
      </div>
    </Layout>
  );
};

export default Dashboard;
