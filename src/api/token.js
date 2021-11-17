import { useState } from "react";

export function useToken() {
    const getToken = () => {
        let userToken = localStorage.getItem('token');
        
        if (!userToken) {
            userToken = sessionStorage.getItem('token');
        }
        return userToken;
    }
    const [token, setToken] = useState(getToken());

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

    return {
        setToken: saveToken,
        token
    }
}