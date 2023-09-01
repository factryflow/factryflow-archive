import React from "react";
import { useAppSelector } from "../app/hooks";
import { logout, selectAuth } from "../features/authSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Dashboard = () => {
  // const { name } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("User Logout Successfully");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: 250,
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Welcome To dashboard
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {/* {name} */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleLogout}>
            Logout
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Dashboard;
