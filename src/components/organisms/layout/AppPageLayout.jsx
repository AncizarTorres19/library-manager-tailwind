//Dependencies
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
//Context
import { NavigateAppProvider } from '../../../context/NavigateAppContext'
//Components
import { Header } from '../header/Header'
//Routes
import { paths } from '../../../routes/paths'

export const AppPageLayout = () => {

    const { auth: { isLogged } } = useSelector((state) => state.persistedData);

    if (!isLogged) {
        return <Navigate to={paths.LOGIN} />
    }

    return (
        <NavigateAppProvider>
            <div className='AppPage flex w-full bg-iceBlue'>
                <div className='Header&AppContentPageLayout w-full flex flex-col'>
                    <Header />
                    <div className='mt-16 min-h-[calc(100vh-64px)]'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </NavigateAppProvider>
    )
}