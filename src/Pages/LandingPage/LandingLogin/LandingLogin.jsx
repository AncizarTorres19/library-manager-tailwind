//Dependencies

import { useContex, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { TextInputSimple } from '../../../components/organisms/inputs/TextInputSimple';

import logo from '../../../assets/Images/logo.png';
import unsplash from '../../../assets/Images/unsplash.png';

import './LandingLogin.css';
import { TextInputController } from '../../../components/organisms/inputs/TextInputController';
import { paths } from '../../../routes/paths';
import { LoginAction } from '../../../redux/actions/AuthAction';
import { useAppDispatch } from '../../../redux/store';
import { CustomAlert } from '../../../components/organisms/customAlert/CustomAlert';
export const LandingLogin = () => {

    const navigate = useNavigate(); // hook para navegar entre páginas
    const dispatch = useAppDispatch(); // hook para ejecutar acciones de redux

    const [rememberMe, setRememberMe] = useState(false);
    const [textAlert, setTextAlert] = useState(''); // estado para mostrar el mensaje de error

    const defaultValues = {
        email: '',
        password: ''
    }

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        control,
        formState: { errors }
    } = useForm({
        defaultValues // se inicializa el formulario con los valores por defecto
    });

    const onSubmit = async (data) => {
        // Lógica de autenticación, verificación de credenciales, etc.
        const user = {
            email: data.email,
            password: data.password,
            // otros datos del usuario
        };

        const { error, verify } = await dispatch(LoginAction(user)); // envía la acción de login con el usuario autenticado
        error && setTextAlert(error); // si hay un error, muestra el mensaje
        verify && navigate(paths.APPHOME); // si el usuario está autenticado, redirige a la página de inicio
    }


    // Cuando se monta el componente, verifica si hay un valor en el localStorage y actualiza el estado "rememberMe".
    useEffect(() => {
        const storedRememberMe = localStorage.getItem('rememberMe');
        if (storedRememberMe === 'true') {
            setRememberMe(true);
            setValue('email', localStorage.getItem('email'));
        }
    }, []);

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
        // Almacena el estado en localStorage cuando cambia.
        localStorage.setItem('rememberMe', !rememberMe);
        localStorage.setItem('email', watch('email'));
    };

    return (
        <form className="desktop" onSubmit={handleSubmit(onSubmit)}>
            <div className="overlap-wrapper">
                <div className="overlap">

                    <div className="group">
                        <div className="overlap-group">
                            <img className="unsplash" alt="Unsplash" src={unsplash} />
                            <span className="rectangle" />
                            <span className="div" />
                        </div>
                    </div>

                    <div className="frame">
                        <div className="group-2">

                            <div className="flex flex-col justify-center gap-2 w-full">

                                <h2 className="text-iniciar-sesion mb-6">Inicia sesión</h2>

                                <TextInputController
                                    control={control}
                                    name={'email'}
                                    rules={{
                                        required: 'Por favor, ingresa tu correo electrónico',
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                            message: 'El correo no es válido'
                                        }
                                    }}
                                    label='Correo electrónico'
                                    placeholder='Escribe tu correo'
                                    type='email'
                                    styleDiv='w-full'
                                    styleLabel='text-base tracking-[0.09px] font-sora text-gray-100 text-left'
                                    styleInput='bg-white w-full rounded-8xs box-border h-[37px] border-[0.5px] border-solid border-primary-gris3 pl-3'
                                />
                                <TextInputController
                                    control={control}
                                    name={'password'}
                                    rules={{ required: 'Por favor, ingresar tu contraseña' }}
                                    label='Contraseña'
                                    placeholder='Ingresa tu contraseña'
                                    type='password'
                                    styleDiv='w-full mt-6 mb-4'
                                    styleLabel='text-base tracking-[0.09px] font-sora text-gray-100 text-left'
                                    styleInput='bg-white w-full rounded-8xs box-border h-[37px] border-[0.5px] border-solid border-primary-gris3 pl-3'
                                />

                                {textAlert && (
                                    <CustomAlert
                                        message={textAlert}
                                        type='error'
                                    />
                                )}

                            </div>

                            <button
                                className="w-full bg-primary-btn1 rounded-md p-2 mt-6 text-white"
                                type='submit'
                            >
                                Ingresar
                            </button>

                            {/* <p className="no-tienes-cuenta-reg mt-1">
                                <span className="span">¿No tienes cuenta? </span>
                                <span className="text-wrapper-5">Regístrate</span>
                            </p> */}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-2 w-full">
                        <img className="logo" alt="logo" src={logo} />
                        <p className="parrafo">Corporación Universitaria Autónoma de Nariño</p>
                    </div>
                </div>
            </div>
        </form>
    );
};