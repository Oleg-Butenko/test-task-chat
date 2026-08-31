import {
  Box,
  List,
  ListItemText,
  ListItemButton,
  TextField,
  Button,
  Typography,
  Divider,
  Paper,
} from "@mui/material";

const mockUsers = ["Alex", "Maria", "Ivan"];
const mockMessages = ["Hi!", "How is it going?"];

const Chat = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: "250px",
          borderRight: "1px solid #e0e0e0",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          Online
        </Typography>
        <Divider />
        <List>
          {mockUsers.map((user) => (
            <ListItemButton key={user}>
              <ListItemText primary={user} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
          {mockMessages.map((msg, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                p: 1.5,
                mb: 2,
                borderRadius: 2,
                width: "fit-content",
                bgcolor: "#e3f2fd",
              }}
            >
              <Typography>{msg}</Typography>
            </Paper>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            p: 2,
            borderTop: "1px solid #e0e0e0",
            bgcolor: "background.default",
          }}
        >
          <TextField fullWidth size="small" placeholder="Hello..." />
          <Button variant="contained" sx={{ ml: 2 }}>
            SEND
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
