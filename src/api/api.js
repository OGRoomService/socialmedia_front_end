import { useState, useEffect } from "react";
import axios from "axios";

const url = 'http://rowanspace.xyz:8080/api'

const axiosPostConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
        'POST': 'OPTIONS'
    },
    mode: 'cors'
}

export const UseApi = (fn) => {
    const [response, setResponse] = useState({
        data: null,
        complete: false,
        pending: false,
        error: false
    });
    const [request, setRequest] = useState();

    useEffect(
        () => {
            if (!request) return;
            setResponse({
                data: null,
                complete: false,
                pending: true,
                error: false
            });
            axios(request)
                .then(response =>
                    setResponse({
                        data: response,
                        complete: true,
                        pending: false,
                        error: false
                    })
                )
                .catch(() =>
                    setResponse({
                        data: null,
                        complete: true,
                        pending: false,
                        error: true
                    })
                );
        }, [request]
    );
    return [response, (...args) => setRequest(fn(...args))];
}

export const PostNewUserEndpoint = () => {
    return UseApi(data => ({
        config: axiosPostConfig,
        url: url + '/users/create',
        method: 'POST',
        data
    }));
}

export const PostUserLogin = () => {
    return UseApi(data => ({
        config: axiosPostConfig,
        url: url + '/users/login',
        method: 'POST',
        data
    }));
}