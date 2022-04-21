import { createSlice } from "@reduxjs/toolkit";

export const snackBarSlice = createSlice({
  name: "snackbar",
  initialState: {
    noticationBar: {
      snackbarOpen: false,
      snackbarType: "",
      snackbarMessage: "",
    }
  },
  reducers: {
    setSnackbar: (state, action) => {
      state.noticationBar.snackbarOpen = action.payload.snackbarOpen;
      state.noticationBar.snackbarType = action.payload.snackbarType;
      state.noticationBar.snackbarMessage = action.payload.snackbarMessage;
    },
    delSnackBar: (state, action) => {
      state.noticationBar.snackbarOpen = false;
      state.noticationBar.snackbarType = "";
      state.noticationBar.snackbarMessage = "";
    }
  },
});
export const {
  setSnackbar,
  delSnackBar,
} = snackBarSlice.actions;
export default snackBarSlice.reducer;
