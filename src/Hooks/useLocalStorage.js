//Dependencies
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        // Obtener el valor almacenado en localStorage o utilizar el valor inicial
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        // Actualizar el valor en localStorage cuando cambia
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    const setLocalStorageValue = (newValue) => {
        // Actualizar el valor en el estado local
        setValue(newValue);
    };

    const removeLocalStorageValue = () => {
        // Eliminar el valor de localStorage y establecer el estado local a null
        localStorage.removeItem(key);
        setValue(null);
    };

    // Retornar el valor actual, la función para establecer el valor y la función para eliminar el valor
    return [value, setLocalStorageValue, removeLocalStorageValue];
};

export default useLocalStorage;

