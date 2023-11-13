import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const useDecodeJWT = (token) => {
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        try {
            const decoded = jwt.decode(token);
            setDecodedToken(decoded);
        } catch (e) {
            console.log(e);
            setDecodedToken(null);
        }
    }, [token]);

    return decodedToken;
};

export default useDecodeJWT;
