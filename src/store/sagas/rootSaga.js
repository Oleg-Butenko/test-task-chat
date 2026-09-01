import { all } from "redux-saga/effects";
import { watchChatSaga } from "./chatSaga";

export function* rootSaga() {
  yield all([watchChatSaga()]);
}
