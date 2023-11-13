//Axios Client
import { axiosClient } from "../../config/AxiosClient";
//Slices
import { getCitiesCase, getContriesCase, getDepartmentsCase } from "../slices/HelpersSlice";

// Acción para trear los paises
export const getContriesAction = () => {

    return async (dispatch) => {
        try {
            const { data: { data } } = await axiosClient.get('/ubicacion/paises');
            dispatch(getContriesCase(data ? data : []));
        } catch (error) {
            console.log(error);
        }
    }

}

// Acción para trear los departamentos
export const getDepartmentsAction = (idCountry) => {

    return async (dispatch) => {
        try {
            const { data: { data } } = await axiosClient.get(`/ubicacion/ciudades/${idCountry}`);
            dispatch(getDepartmentsCase(data ? data : []));
        } catch (error) {
            console.log(error);
        }
    }

}

// Acción para trear las ciudades
export const getCitiesAction = (idDepartment) => {

    return async (dispatch) => {
        try {
            const { data: { data } } = await axiosClient.get(`/ubicacion/departamentos/${idDepartment}`);
            dispatch(getCitiesCase(data ? data : []));
        } catch (error) {
            console.log(error);
        }
    }

}
