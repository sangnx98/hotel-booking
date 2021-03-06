import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    roomById: [],
    noticationBar: {
      snackbarOpen: false,
      snackbarType: "",
      snackbarMessage: "",
    },
    center: {},
  },
  reducers: {
    signUpSuccess: (state, action) => {
      state.user= action.payload
    },
    logoutRequest: (state, action) => {
      state.user = {}
    },
    getRoomsById: (state, action) => {
      state.roomById = action.payload;
    },
    setSnackbar: (state, action) => {
      state.noticationBar.snackbarOpen = action.payload.snackbarOpen;
      state.noticationBar.snackbarType = action.payload.snackbarType;
      state.noticationBar.snackbarMessage = action.payload.snackbarMessage;
    },
    delSnackBar: (state, action) => {
      state.noticationBar.snackbarOpen = false;
      state.noticationBar.snackbarType = "";
      state.noticationBar.snackbarMessage = "";
    },
    setCenterLatlng: (state, action) => {
      state.center = action.payload;
    },
  },
});
export const {
  signUpSuccess,
  getRoomsById,
  logoutRequest,
  setSnackbar,
  delSnackBar,
  setCenterLatlng,
} = userSlice.actions;
export default userSlice.reducer;
