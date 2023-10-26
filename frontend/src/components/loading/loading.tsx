import { Box, Container, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Loading;
