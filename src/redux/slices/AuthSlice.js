import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    user_id: null,
    company: "",
    email: "",
    isLogged: false,
    // otros campos relacionados con la autenticación
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginCase: (state, action) => {
            const { user_id, username, company } = action.payload;
            state.user_id = user_id;
            state.username = username;
            state.company = company;
            state.isLogged = true;
        },
        signOffCase: (state) => {
            state.user_id = null;
            state.username = null;
            state.company = "";
            state.isLogged = false;
        },
    },
});

export const { loginCase, signOffCase } = authSlice.actions;
export default authSlice.reducer;
