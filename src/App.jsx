//Dependencies
import { HashRouter, Route, Routes } from 'react-router-dom';
//Pages
import { AppPageLayout } from './components/organisms/layout/AppPageLayout'
import { HomePage } from './pages/AppPage/AppHomePage/HomePage';
import { LandingLogin } from './Pages/LandingPage/LandingLogin/LandingLogin'
//Context
import { GlobalContextProvider } from './context/GlobalContext';
//Routes
import { paths } from '../src/routes/paths.js'
//Css
import './App.css'

export const App = () => {
  return (
    <GlobalContextProvider>
      <HashRouter>
        <Routes>
          <Route path={paths.LOGIN} element={<LandingLogin />} />
          <Route path={paths.APP} element={<AppPageLayout />}>
            <Route path={paths.APPHOME} element={<HomePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </GlobalContextProvider>
  )
}