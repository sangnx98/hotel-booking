import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user:{
            id: '',
            name: '',
            password: '',
            email: '',
            pending: false,
            error: false,
        },
        roomById: [],
        snackbarOpen: false,
        snackbarType: "",
        snackbarMessage: ""
    },
    reducers:{
        signUpStart:(state) => {
            state.user.pending = true;
        },
        signUpError: (state)=> {
            state.user.pending = false;
            state.user.error = true;
        },
        signUpSuccess: (state, action) => {
            state.user.pending = false;
            state.user.error = false;
            state.user.id =action.payload.id;
            state.user.name =action.payload.name;
            state.user.email =action.payload.email;
            state.user.password =action.payload.password;
        },
        logoutRequest: (state, action) =>{
            state.user.id = '';
            state.user.name = '';
            state.user.password = '';
        },
        getRoomsById: (state, action) =>{
            state.roomById = action.payload
        },
        setSnackbar: (state, action) => {
            state.snackbarOpen = action.payload
            state.snackbarType = action.payload
            state.snackbarMessage = action.payload
        }
    }
})
export const {signUpStart, signUpError, signUpSuccess, getRoomsById, logoutRequest, setSnackbar} = userSlice.actions
export default userSlice.reducer