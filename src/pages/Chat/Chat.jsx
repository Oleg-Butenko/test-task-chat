import { useEffect, useState } from "react";
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
import { useParams, useNavigate } from "react-router-dom";
import UserBadge from "../../components/UserBadge/UserBadge";
import OnlineUsers from "../../components/OnlineUsers/OnlineUsers";
import { useDispatch, useSelector } from "react-redux";

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const [messageText, setMessageText] = useState("");

  const currentLogin = useSelector((state) => state.user.login);
  const roomMessages = useSelector(
    (state) => state.chat.messagesByRoom[roomId] || [],
  );
  const messagesByRoom = useSelector((state) => state.chat.messagesByRoom);
  const rooms = Object.keys(messagesByRoom);

  useEffect(() => {
    if (roomId) {
      dispatch({ type: "JOIN_ROOM", payload: roomId });
    }
  }, [roomId, dispatch]);

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      dispatch({
        type: "SEND_WS_MESSAGE",
        payload: {
          room: roomId,
          text: messageText,
          sender: currentLogin,
        },
      });
      setMessageText("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#f5f5f5",
        p: 2,
        gap: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "250px", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
          <Typography variant="h6">Rooms</Typography>
        </Box>
        <Divider />
        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          {rooms.map((room) => (
            <ListItemButton
              key={room}
              onClick={() => navigate(`/chat/${room}`)}
              selected={room === roomId}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                },
              }}
            >
              <ListItemText primary={room} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" onClick={() => navigate("/rooms")}>
            Rooms Menu
          </Button>
        </Box>
      </Paper>

      <Paper
        elevation={3}
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">
            Room: <span style={{ fontWeight: "bold" }}>{roomId}</span>
          </Typography>
          <UserBadge />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {roomMessages.length === 0 ? (
            <Typography
              color="textSecondary"
              sx={{ textAlign: "center", mt: 4 }}
            >
              Let's start chatting in #{roomId}!
            </Typography>
          ) : (
            roomMessages.map((msg, index) => {
              const isMyMessage = msg.sender === currentLogin;
              return (
                <Box
                  key={index}
                  sx={{
                    alignSelf: isMyMessage ? "flex-end" : "flex-start",
                    bgcolor: isMyMessage ? "#1976d2" : "#e0e0e0",
                    color: isMyMessage ? "white" : "black",
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: "70%",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mb: 0.5,
                      opacity: 0.8,
                      fontWeight: "bold",
                    }}
                  >
                    {isMyMessage ? "You" : msg.sender}
                  </Typography>
                  <Typography>{msg.text}</Typography>
                </Box>
              );
            })
          )}
        </Box>

        <Box sx={{ p: 2, borderTop: "1px solid #e0e0e0", display: "flex" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={handleSendMessage}
          >
            SEND
          </Button>
        </Box>
      </Paper>

      <OnlineUsers />
    </Box>
  );
};

export default Chat;
