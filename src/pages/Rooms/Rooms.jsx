import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";

const mockRooms = ["General", "Informal", "Work"];

const Rooms = () => {
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
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "400px",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center">
          Rooms
        </Typography>

        <Button variant="contained" fullWidth size="large">
          NEW ROOM
        </Button>

        <List>
          {mockRooms.map((room) => (
            <ListItemButton
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                mb: 1,
              }}
              key={room}
            >
              <ListItemText primary={room} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Rooms;
