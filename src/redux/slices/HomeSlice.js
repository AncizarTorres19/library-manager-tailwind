import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articles: [],
    articlesStatus: [],
    personsAlerts: [],
    students: [],
    teachers: [],
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        assignArticleCase: (state, action) => {
            state.articles = action.payload;
        },
        getArticlesCase: (state, action) => {
            state.articles = action.payload;
        },
        getArticlesStatusCase: (state, action) => {
            state.articlesStatus = action.payload;
        },
        getPersAlertsCase: (state, action) => {
            state.personsAlerts = action.payload;
        },
        getStudentsCase: (state, action) => {
            state.students = action.payload;
        },
        getTeachersCase: (state, action) => {
            state.teachers = action.payload;
        },
    },
});

export const {
    assignArticleCase,
    getArticlesCase,
    getArticlesStatusCase,
    getPersAlertsCase,
    getStudentsCase,
    getTeachersCase,
} = homeSlice.actions;
export default homeSlice.reducer;