import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

export default function Loader() {
  return (
    
    <Container
      maxWidth={"sm"}
      sx={{
        minHeight: "100vh",
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", m: "auto" }}>
        <CircularProgress />
      </Box>
    </Container>
  );
}
