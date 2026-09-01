import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesByRoom: {
    general: [],
    work: [],
    informal: [],
  },
  onlineUsers: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { room, text, sender } = action.payload;
      if (!state.messagesByRoom[room]) {
        state.messagesByRoom[room] = [];
      }
      state.messagesByRoom[room].push({ text, sender });
    },

    setRoomsList: (state, action) => {
      const serverRooms = action.payload;
      serverRooms.forEach((room) => {
        if (!state.messagesByRoom[room]) {
          state.messagesByRoom[room] = [];
        }
      });
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setRoomHistory: (state, action) => {
      const { room, messages } = action.payload;
      state.messagesByRoom[room] = messages;
    },
  },
});

export const { addMessage, setRoomsList, setOnlineUsers, setRoomHistory } =
  chatSlice.actions;
export default chatSlice.reducer;
