import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {isAuthenticated: false, token: null, haveAccount: false, email: null},
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