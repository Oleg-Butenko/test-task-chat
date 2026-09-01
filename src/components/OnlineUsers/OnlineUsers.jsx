import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid #44b700",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const OnlineUsers = () => {
  const onlineUsers = useSelector((state) => state.chat.onlineUsers || []);
  const currentLogin = useSelector((state) => state.user.login);

  return (
    <Paper
      elevation={2}
      sx={{
        width: "250px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Online Users ({onlineUsers.length})
      </Typography>
      <List sx={{ flexGrow: 1, overflowY: "auto", p: 0 }}>
        {onlineUsers.map((user) => {
          const isMe = user.name === currentLogin;
          return (
            <ListItem key={user.id} sx={{ px: 0, py: 1 }}>
              <ListItemAvatar>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    sx={{ bgcolor: isMe ? "primary.main" : "secondary.main" }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </StyledBadge>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.name} ${isMe ? "(You)" : ""}`}
                secondary="Online"
                primaryTypographyProps={{
                  fontWeight: isMe ? "bold" : "normal",
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default OnlineUsers;
