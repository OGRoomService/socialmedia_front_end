import { useRef, useState } from "react";

export function useToken() {
    const getToken = () => {
        let userToken = localStorage.getItem('token');
        
        if (!userToken) {
            userToken = sessionStorage.getItem('token');
        }
        return userToken;
    }
    const [token, setToken] = useState(getToken());

    const deleteToken = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    }

    const saveToken = userToken => {
        const tokenToSave = {
            access_token: userToken.access_token,
            refresh_token: userToken.refresh_token
        }
        if (userToken.remember) {
            localStorage.setItem('token', JSON.stringify(tokenToSave));
        } else {
            sessionStorage.setItem('token', JSON.stringify(tokenToSave));
        }
        setToken(tokenToSave);
    }

    const getParsedToken = () => {
        try {
            return JSON.parse(token);
        } catch (e) {
            if (token) {
                return token;
            } else {
                return null;
            }
        }
    }

    return {
        setToken: saveToken,
        deleteToken: deleteToken,
        token: getParsedToken()
    }
}