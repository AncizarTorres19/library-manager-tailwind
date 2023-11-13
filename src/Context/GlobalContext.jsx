//Dependencies
import { createContext, useMemo, useState } from "react";
//Context
export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false);
    const [pendiente, setPendiente] = useState(1);

    const memoizedValue = useMemo(() => ({
        isLogged,
        setIsLogged,
        pendiente,
        setPendiente,
    }), [isLogged, setIsLogged]);

    return (
        <GlobalContext.Provider value={memoizedValue}>
            {children}
        </GlobalContext.Provider>
    )
}