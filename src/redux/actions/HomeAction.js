import { axiosClient } from "../../config/AxiosClient";

import { dataPerson } from "../../Data";
//Slices
import {
    assignArticleCase,
    getArticlesCase,
    getArticlesStatusCase,
    getPersAlertsCase,
    getStudentsCase,
    getTeachersCase,
} from "../slices/HomeSlice";


// Acción para trear las personas con alertas
export const getPersAlertsAction = () => async (dispatch) => {
    dispatch(getPersAlertsCase(dataPerson));
    // try {
    //     const res = await axiosClient.get("/api/personas/alertas");
    //     dispatch(getPersAlertsCase(res.data));
    // } catch (error) {
    //     console.log(error);
    // }
};

// Acción para trear los estudiantes
export const getStudentsAction = () => async (dispatch) => {
    try {
        const res = await axiosClient.get("/api/estudiantes");
        dispatch(getStudentsCase(res.data));
    } catch (error) {
        console.log(error);
    }
};

// Acción para trear los profesores
export const getTeachersAction = () => async (dispatch) => {
    try {
        const res = await axiosClient.get("/api/profesores");
        dispatch(getTeachersCase(res.data));
    } catch (error) {
        console.log(error);
    }
};

// Acción para trear los articulos
export const getArticlesAction = () => async (dispatch) => {
    try {
        const res = await axiosClient.get("/api/articulos");
        dispatch(getArticlesCase(res.data));
    } catch (error) {
        console.log(error);
    }
};

// Acción para trear los estados de los articulos (estadiaticas)
export const getArticlesStatusAction = () => async (dispatch) => {
    try {
        const res = await axiosClient.get("/api/articulos/estados");
        dispatch(getArticlesStatusCase(res.data));
    } catch (error) {
        console.log(error);
    }
};

// Acción para asignar un articulo a un estudiante
export const assignArticleAction = (data) => async (dispatch, getState) => {
    const { home: { personsAlerts } } = getState().persistedData;
    console.log(personsAlerts);
    // try {
    //     const res = await axiosClient.post("/api/articulos/asignar", data);
    //     dispatch(assignArticleCase(res.data));
    // } catch (error) {
    //     console.log(error);
    // }
};