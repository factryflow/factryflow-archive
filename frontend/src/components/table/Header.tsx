import { Typography, Box, useTheme, Button } from "@mui/material";

const Header = ({ title, buttonname, onClick }: any) => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 20px",
      }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{ m: "0 0 5px 0", fontWeight: 400, color: "black" }}
        >
          {title}
        </Typography>
      </Box>
      <Box>
        <Button
          sx={{ padding: "7px 15px", borderRadius: "6px" }}
          variant="contained"
          onClick={onClick}
        >
          {buttonname}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
