import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const initialState = {
    tooltip: {
        showTooltip: false,
        textTooltip: "",
        position: { x: 0, y: 0 },
    },
    location: {
        countries: [],
        departments: [],
        cities: [],
    },
    // otros campos relacionados con las ayudas
};

const helpersSlice = createSlice({
    name: "helpers",
    initialState,
    reducers: {
        setTooltipCase(state, action) {
            state.tooltip = action.payload;
        },
        resetTooltipCase(state) {
            state.tooltip = initialState.tooltip;
        },
        getContriesCase(state, action) {
            state.location.countries = action.payload;
        },
        getDepartmentsCase(state, action) {
            state.location.departments = action.payload;
        },
        getCitiesCase(state, action) {
            state.location.cities = action.payload;
        }
    },
});

export const {
    setTooltipCase,
    resetTooltipCase,
    getContriesCase,
    getDepartmentsCase,
    getCitiesCase,
} = helpersSlice.actions;
export default helpersSlice.reducer;
