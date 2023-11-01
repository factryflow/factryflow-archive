import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </Box>
  );
};

export default NotFound;
