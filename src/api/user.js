import { useEffect, useState } from "react";
import { useToken } from "./token";

export function currentUser() {
    const token = useToken();

    const getUserData = () => {
        let currentUser = sessionStorage.getItem('current-user');

        if (currentUser) {
            const parsedUser = JSON.parse(currentUser);


            if (parsedUser['id']){
                console.log("Grabbing from storage");
                return parsedUser;
            }
        }
        return null;
    }

    const [userData, setUserData] = useState(getUserData());

    useEffect(() => {
        if (!userData)
            fetchUser();
    }, []);

    async function fetchUser() {
        const uToken = JSON.parse(token.token)['access_token'];

        console.log("pulled from api");
        const response = await fetch('http://rowanspace.xyz:8080/api/users/get_self', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + uToken
            }
        })
            .then(data => {
                return data.json();
            });

        console.log(response);

        sessionStorage.setItem('current-user', JSON.stringify(response));
        setUserData(response);
    }

    return {
        userData
    }
}