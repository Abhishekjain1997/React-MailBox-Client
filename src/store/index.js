import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";
import mailSlice from "./mail-slice";

const store = configureStore({
    reducer: {auth: authSlice.reducer, ui: uiSlice.reducer, mail: mailSlice.reducer}
})




export default store  