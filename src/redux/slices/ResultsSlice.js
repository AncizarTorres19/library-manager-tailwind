import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
};

export const resultsSlice = createSlice({
    name: "results",
    initialState,
    reducers: {

    },
});

export const { } = resultsSlice.actions;
export default resultsSlice.reducer;