import { Server } from "socket.io";

const io = new Server(3001, {
  cors: { origin: "*" },
});

let onlineUsers = [];

const messagesByRoom = {
  general: [],
  work: [],
  informal: [],
};

io.on("connection", (socket) => {
  console.log("Новое подключение:", socket.id);

  socket.on("LOGIN", (username) => {
    socket.username = username;
    onlineUsers.push({ id: socket.id, name: username });

    socket.emit("ROOMS_LIST", Object.keys(messagesByRoom));
    io.emit("UPDATE_ONLINE_USERS", onlineUsers);
  });

  socket.on("JOIN_ROOM", (roomName) => {
    socket.join(roomName);
    console.log(`${socket.username} зашел в комнату ${roomName}`);

    if (!messagesByRoom[roomName]) {
      messagesByRoom[roomName] = [];
    }

    socket.emit("ROOM_HISTORY", {
      room: roomName,
      messages: messagesByRoom[roomName],
    });
  });

  socket.on("CREATE_ROOM", (roomName) => {
    if (!messagesByRoom[roomName]) {
      messagesByRoom[roomName] = [];
      io.emit("ROOMS_LIST", Object.keys(messagesByRoom));
    }
  });

  socket.on("SEND_MESSAGE", (data) => {
    if (!messagesByRoom[data.room]) {
      messagesByRoom[data.room] = [];
    }
    messagesByRoom[data.room].push(data);
    io.to(data.room).emit("RECEIVE_MESSAGE", data);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.id !== socket.id);
    io.emit("UPDATE_ONLINE_USERS", onlineUsers);
  });
});

console.log("WebSocket сервер запущен на порту 3001");
