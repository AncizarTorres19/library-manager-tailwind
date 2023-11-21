import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articles: [],
    articlesStatus: null,
    asignments: [],
    students: [],
    teachers: [],
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        getArticlesCase: (state, action) => {
            state.articles = action.payload;
        },
        getArticlesStatusCase: (state, action) => {
            state.articlesStatus = action.payload;
        },
        getStudentsCase: (state, action) => {
            state.students = action.payload;
        },
        getTeachersCase: (state, action) => {
            state.teachers = action.payload;
        },
        getAsignmentsCase: (state, action) => {
            state.asignments = action.payload;
        },
    },
});

export const {
    getArticlesCase,
    getArticlesStatusCase,
    getAsignmentsCase,
    getStudentsCase,
    getTeachersCase,
} = homeSlice.actions;
export default homeSlice.reducer;