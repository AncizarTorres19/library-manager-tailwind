//Axios Client
import { axiosClient } from "../../config/AxiosClient";
//Slices
import { loginCase } from "../slices/AuthSlice";


// Acción para el login
export const LoginAction = (user) => {

    return async (dispatch) => {
        try {
            const { data } = await axiosClient.post('/login', user);
            const { id, username } = data.usuario;
            localStorage.setItem('token', data.token);
            dispatch(loginCase({ id, username, company: 'Aunar' }));
            return { error: null, verify: true };
        } catch (error) {
            console.log(error);
            return { error: 'Correo o contraseña inválidos, intenta nuevamente', verify: false };
        }
    }

}

// Acción para el registro
export const SignUpAction = (dataRegister) => {

    return async (dispatch) => {
        try {
            const response = await axiosClient.post('/users', dataRegister);
            // dispatch(loginCase(response));
            return { error: null, verify: true };
        } catch (error) {
            console.log(error);
            let TextError = error.response.data.message === 'Esta empresa ya existe' ? 'El NIT ingresado ya está registrado, intenta con otro' : error.response.data.message;
            return { error: TextError, verify: false };
        }
    }
}

//Recuperar contraseña - enviar correo
export const RecoverPasswordAction = (email) => {

    return async (dispatch) => {
        try {
            const response = await axiosClient.post('/users/retrieve', { email });
            return { error: null, verify: true };
        } catch (error) {
            return { error: 'El correo ingresado no está registrado', verify: false };
        }
    }
}

//Recuperar contraseña - cambiar contraseña
export const ChangePasswordAction = (contraseña, id) => {

    return async (dispatch) => {
        try {
            const response = await axiosClient.put(`/users/retrieve/${id}`, { contraseña });
            return { error: null, verify: true };
        } catch (error) {
            console.log(error);
            return { error: 'El correo ingresado no está registrado', verify: false };
        }
    }
}