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
//Assets
import { Icons } from '../../../assets/Icons/IconProvider'
const { UserIcon } = Icons  //Iconos

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
        setLogOutVisible(false)
        nav(paths.LOGIN)
    }

    return (
        <div className='Header bg-primary-blue1 w-full h-14 flex justify-end fixed left-0 top-0 z-10 p-6'>
            <div className='flex items-center justify-between gap-7 w-full text-white'>
                <p>Corporación Universitaria Autónoma de Nariño</p>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <img className='mb-1' src={UserIcon} alt="UserIcon" />
                    <p>{username}</p>
                    <span>|</span>
                    <span
                        className='cursor-pointer'
                        onClick={logOutAction}
                    >
                        Salir
                    </span>
                </div>
            </div>
        </div>
    )
}