import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  password: "",
  access_token: "",
  isAdmin: "false",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      const { name, email, access_token, isAdmin, phone, image } =
        action.payload;
      state.name = name || email;
      state.email = email;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
      state.phone = phone;
      state.image = image;
    },
    resetUser(state) {
      state.name = "";
      state.email = "";
      state.access_token = "";
      state.isAdmin = false;
      state.phone = "";
      state.image = "";
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
