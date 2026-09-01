import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItemText,
  ListItemButton,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserBadge from "../../components/UserBadge/UserBadge";
import { useState } from "react";

const Rooms = () => {
  const [newRoomName, setNewRoomName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const messagesByRoom = useSelector((state) => state.chat.messagesByRoom);
  const rooms = Object.keys(messagesByRoom);

  const handleCreateRoom = () => {
    if (newRoomName.trim() !== "") {
      dispatch({ type: "SERVER_CREATE_ROOM", payload: newRoomName.trim() });
      setNewRoomName("");
    }
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

        <TextField
          fullWidth
          size="small"
          placeholder="Enter room name..."
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleCreateRoom}
        >
          NEW ROOM
        </Button>

        <List>
          {rooms.map((room) => (
            <ListItemButton
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                mb: 1,
              }}
              key={room}
              onClick={() => navigate(`/chat/${room}`)}
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
