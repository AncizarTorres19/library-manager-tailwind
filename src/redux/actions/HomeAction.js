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
    //      const { data } = await axiosClient.get("/api/personas/alertas");
    //     dispatch(getPersAlertsCase(res.data));
    // } catch (error) {
    //     console.log(error);
    // }
};

//Acción para traer las estadisticas de los articulos
export const getArticlesStatusAction = () => async (dispatch) => {
    try {
        const { data } = await axiosClient.get("/books/status");
        dispatch(getArticlesStatusCase(data.estadisticas));
    } catch (error) {
        console.log(error);
    }
};

// Acción para trear los estudiantes
export const getStudentsAction = () => async (dispatch) => {
    try {
        const { data } = await axiosClient.get("/students");
        dispatch(getStudentsCase(data.estudiantes));
    } catch (error) {
        console.log(error);
    }
};

// Acción para trear los profesores
export const getTeachersAction = () => async (dispatch) => {
    try {
        const { data } = await axiosClient.get("/professors");
        dispatch(getTeachersCase(data.profesores));
    } catch (error) {
        console.log(error);
    }
};

// Acción para trear los articulos
export const getArticlesAction = () => async (dispatch) => {
    try {
        const { data } = await axiosClient.get("/books");
        dispatch(getArticlesCase(data.libros));
    } catch (error) {
        console.log(error);
    }
};

// Acción para asignar un articulo a un estudiante
export const assignArticleAction = (obj) => async (dispatch, getState) => {
    try {
        const { data } = await axiosClient.post("/assignments/create", obj);
        dispatch(getArticlesAction());
        dispatch(getArticlesStatusAction());
        return { error: null, verify: true };
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message, verify: false };
    }
};