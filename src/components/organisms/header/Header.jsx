//Dependencies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//Routes
import { paths } from '../../../routes/paths'
//Redux
import { useAppDispatch } from '../../../redux/store'
import { useSelector } from 'react-redux'
//Actions
import { signOffCase } from '../../../redux/slices/AuthSlice'
import { resetRegisterAction } from '../../../redux/slices/RegisterSlice'

export const Header = () => {

    const nav = useNavigate(); // hook para navegar entre páginas

    const dispatch = useAppDispatch(); // hook para ejecutar acciones de redux

    const { auth: { username } } = useSelector((state) => state.persistedData);

    const [logOutVisible, setLogOutVisible] = useState(false)


    const showLogOut = () => {
        setLogOutVisible(prev => !prev)
    }

    const logOutAction = async () => {
        localStorage.clear();
        dispatch(signOffCase())
        dispatch(resetRegisterAction())
        setLogOutVisible(false)
        nav(paths.HOME)
    }

    return (
        <div className='Header bg-primary-white1 w-full h-16 flex justify-end fixed left-0 top-0 z-10'>
            {logOutVisible ?
                <div className='bg-indigo-500 w-[100vw] h-screen absolute z-30 right-0 bg-transparent' onClick={() => setLogOutVisible(false)}>
                    <div
                        className='absolute border border-gray-500 rounded-lg px-3 py-[4px] right-[90px] top-12 z-50 cursor-pointer bg-whitesmoke-300'
                        onClick={logOutAction}
                    >
                        Cerrar Sesión
                    </div>
                </div>
                : null}
            <div className='flex items-center gap-3 mr-12'>
                <p>{username}</p>
            </div>
        </div>
    )
}