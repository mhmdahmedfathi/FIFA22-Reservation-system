
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        username: "",
        role: ""
    },
    reducers: {
        GetUserInfo: (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.role = action.payload.role;
        },
        loggedIn: (state, action) => {
            state.isAuthenticated = true;
            state.username = action.payload.user;
            state.role = action.payload.role;
        },
        loggedOut: (state) => {
            state.isAuthenticated = false;
            state.username = "";
            state.role = "";
        }
    }
})

export const authAction = authSlice.actions;

export default authSlice;