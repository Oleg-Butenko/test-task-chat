import { eventChannel } from "redux-saga";
import { take, put, call, fork, takeEvery } from "redux-saga/effects";
import { io } from "socket.io-client";
import {
  addMessage,
  setOnlineUsers,
  setRoomHistory,
  setRoomsList,
} from "../chatSlice";

const SERVER_URL = "http://localhost:3001";
let socket;

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    socket.on("RECEIVE_MESSAGE", (message) => {
      emit({ type: "RECEIVE_MESSAGE", payload: message });
    });

    socket.on("UPDATE_ONLINE_USERS", (users) => {
      emit({ type: "UPDATE_ONLINE_USERS", payload: users });
    });

    socket.on("ROOM_HISTORY", (history) => {
      emit({ type: "ROOM_HISTORY", payload: history });
    });

    socket.on("ROOMS_LIST", (rooms) =>
      emit({ type: "ROOMS_LIST", payload: rooms }),
    );

    return () => socket.disconnect();
  });
}

function* readMessages(channel) {
  while (true) {
    const action = yield take(channel);
    if (action.type === "RECEIVE_MESSAGE") {
      yield put(addMessage(action.payload));
    }
    if (action.type === "UPDATE_ONLINE_USERS") {
      yield put(setOnlineUsers(action.payload));
    }

    if (action.type === "ROOM_HISTORY") {
      yield put(setRoomHistory(action.payload));
    }

    if (action.type === "ROOMS_LIST") yield put(setRoomsList(action.payload));
  }
}

function* sendMessage(action) {
  yield call([socket, socket.emit], "SEND_MESSAGE", action.payload);
}

function* joinRoom(action) {
  yield call([socket, socket.emit], "JOIN_ROOM", action.payload);
}

function* createRoomSaga(action) {
  yield call([socket, socket.emit], "CREATE_ROOM", action.payload);
}

export function* watchChatSaga() {
  const loginAction = yield take("user/setLogin");
  const username = loginAction.payload;

  socket = io(SERVER_URL);

  yield call([socket, socket.emit], "LOGIN", username);

  const channel = yield call(createSocketChannel, socket);
  yield fork(readMessages, channel);

  yield takeEvery("SEND_WS_MESSAGE", sendMessage);
  yield takeEvery("JOIN_ROOM", joinRoom);
  yield takeEvery("SERVER_CREATE_ROOM", createRoomSaga);
}
