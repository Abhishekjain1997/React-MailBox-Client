import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {isAuthenticated: localStorage.getItem('token')?true:false, token: localStorage.getItem('token')||'', haveAccount: false, email: localStorage.getItem('email')||''},
    reducers: {
        login(state, action) {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.email = action.payload.email

        },
        logout(state) {
            state.isAuthenticated = false
            state.token = null
        },
        haveAccount(state) {
            state.haveAccount = !state.haveAccount
        }
    }
})


export const authActions = authSlice.actions
export default authSlice