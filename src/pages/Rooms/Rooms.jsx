import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserBadge from "../../components/UserBadge/UserBadge";

const mockRooms = ["General", "Informal", "Work"];

const Rooms = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/chat");
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Rooms</Typography>
          <UserBadge />
        </Box>

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
              onClick={handleNavigate}
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
