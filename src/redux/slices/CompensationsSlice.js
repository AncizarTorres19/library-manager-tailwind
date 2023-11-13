import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null
};

export const compensationsSlice = createSlice({
    name: "compensations",
    initialState,
    reducers: {

    },
});

export const { } = compensationsSlice.actions;
export default compensationsSlice.reducer;