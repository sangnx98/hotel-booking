import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user:{
            id: '',
            name: '',
            password: '',
            email: '',
            address: '',
            phoneNumber: '',
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
            state.user.address =action.payload.address;
            state.user.phoneNumber =action.payload.phoneNumber;
            state.user.password =action.payload.password;
        },
        logoutRequest: (state, action) =>{
            state.user.id = '';
            state.user.name = '';
            state.user.password = '';
            state.user.email = '';
            state.user.address = '';
            state.user.phoneNumber = '';
        },
        getRoomsById: (state, action) =>{
            state.roomById = action.payload
        },
        setSnackbar: (state, action) => {
            state.snackbarOpen = action.payload.snackbarOpen
            state.snackbarType = action.payload.snackbarType
            state.snackbarMessage = action.payload.snackbarMessage
        }
    }
})
export const {signUpStart, signUpError, signUpSuccess, getRoomsById, logoutRequest, setSnackbar} = userSlice.actions
export default userSlice.reducer