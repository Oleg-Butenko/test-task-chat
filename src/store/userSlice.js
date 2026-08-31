import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    login: "",
  },
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { setLogin } = userSlice.actions;
export default userSlice.reducer;
