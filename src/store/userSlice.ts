import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        user:{
            name: '',
            password: '',
            email: '',
            pending: false,
            error: false,
        }
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
            state.user.name =action.payload.name;
            state.user.email =action.payload.email;
            state.user.password =action.payload.password;
        }
    }
})
export const {signUpStart, signUpError, signUpSuccess} =userSlice.actions
export default userSlice.reducer