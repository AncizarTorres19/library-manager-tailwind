import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstStep: {},
    secondStep: {},
    thirdStep: {},
    fourthStep: {},
    calculations: null,
    centerCurrent: null,
    centers: [],
    directEmissions: [],
    inDirectEmissions: [],
    otherEmissions: [],
    productiveSector: [],
};

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        updateFirstStepCase: (state, action) => {
            state.firstStep = action.payload;
        },
        updateSecondStepCase: (state, action) => {
            state.secondStep = action.payload;
        },
        updateThirdStepCase: (state, action) => {
            state.thirdStep = action.payload;
        },
        updateFourthStepCase: (state, action) => {
            state.fourthStep = action.payload;
        },
        getCentersCase: (state, action) => {
            state.centers = action.payload;
        },
        getCenterCurrentCase: (state, action) => {
            state.centerCurrent = action.payload;
        },
        getDirectEmissionsCase: (state, action) => {
            state.directEmissions = action.payload;
        },
        getInDirectEmissionsCase: (state, action) => {
            state.inDirectEmissions = action.payload;
        },
        getOtherEmissionsCase: (state, action) => {
            state.otherEmissions = action.payload;
        },
        getSectorProductivoCase: (state, action) => {
            state.productiveSector = action.payload;
        },
        getCalculationsCase: (state, action) => {
            state.calculations = action.payload;
        },

        resetRegisterAction: (state) => {
            state.centerCurrent = null;
            state.centers = [];
            state.directEmissions = [];
            state.firstStep = {};
            state.fourthStep = {};
            state.inDirectEmissions = [];
            state.otherEmissions = [];
            state.productiveSector = [];
            state.secondStep = {};
            state.thirdStep = {};
            state.calculations = [];
        },
    },
});

export const {
    getCenterCurrentCase,
    getCentersCase,
    getDirectEmissionsCase,
    getInDirectEmissionsCase,
    getOtherEmissionsCase,
    getSectorProductivoCase,
    resetRegisterAction,
    updateFirstStepCase,
    updateFourthStepCase,
    updateSecondStepCase,
    updateThirdStepCase,
    getCalculationsCase,
} = registerSlice.actions;
export default registerSlice.reducer;