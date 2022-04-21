import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomById: [],
    center: {},
  },
  reducers: {
    getRoomsById: (state, action) => {
      state.roomById = action.payload;
    },
    setCenterLatlng: (state, action) => {
      state.center = action.payload;
    },
  },
});
export const {
  getRoomsById,
  setCenterLatlng,
} = roomSlice.actions;
export default roomSlice.reducer;
