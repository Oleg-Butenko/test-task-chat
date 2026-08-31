import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    console.log("Вхід під іменем:", username);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "400px",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" align="center">
          Join Chat
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button variant="contained" onClick={handleLogin} size="large">
          JOIN CHAT
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
