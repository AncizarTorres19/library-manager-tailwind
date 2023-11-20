import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    id: null,
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
            const { id, username, company } = action.payload;
            state.id = id;
            state.username = username;
            state.company = company;
            state.isLogged = true;
        },
        signOffCase: (state) => {
            state.id = null;
            state.username = null;
            state.company = "";
            state.isLogged = false;
        },
    },
});

export const { loginCase, signOffCase } = authSlice.actions;
export default authSlice.reducer;
