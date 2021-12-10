import { useEffect, useState } from "react";
import { useToken } from "./token";

export function currentUser() {
    const { token } = useToken();
    const baseUrl = 'http://rowanspace.xyz:8080/api'
    const userTokenName = 'current_user';

    const getUserData = () => {
        let currentUser = sessionStorage.getItem(userTokenName);

        if (currentUser) {
            const parsedUser = JSON.parse(currentUser);


            if (parsedUser['id']) {
                return parsedUser;
            }
        }
        return {};
    }

    const [userData, setUserData] = useState(getUserData());

    const hasData = () => {
        if (!userData || !userData['id'])
            return false;
        return true;
    }

    useEffect(() => {
        if (!hasData())
            fetchUser();
    }, []);

    const setUser = (user) => {
        sessionStorage.setItem(userTokenName, JSON.stringify(user));
        setUserData(user);
    }

    const deleteUser = () => {
        sessionStorage.removeItem(userTokenName);
    }

    async function fetchUser() {
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(baseUrl + '/users/get_self', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + uToken
            }
        })
            .then(data => {
                return data.json();
            });
        setUser(response);
    }

    return {
        getUserData,
        deleteUser,
        setUser,
        hasData,
        userData
    }
}