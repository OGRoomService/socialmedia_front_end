import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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


export const useApi = (apiFunction, params, callback) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      apiFunction(params)
        .then(({ data }) => {
          setData(data);
          setIsLoading(false);
          if (callback) {
            callback(data);
          }
        })
        .catch(() => {
          setError("Something went wrong");
          setIsLoading(false);
        });
    }, [apiFunction, params, callback]);
  
    return [isLoading, data, error];
};
  
export const postNewUser = params => {
    if (!params) throw new Error("Must provide params!");
    const url = "http://localhost:8080/api/users/create";

    return axios.post(url, params, axiosPostConfig);
}

/* export function UseApi(fn) {
    const [response, setResponse] = useState({
        data: null,
        complete: false,
        pending: false,
        error: false
    })
    const [request, setRequest] = useState();

    useEffect(
        () => {
            if (!request) return;
            setResponse({
                data: null,
                pending: true,
                error: false,
                complete: false
            });
            axios(request)
                .then(response => 
                    setResponse({
                        data: response.data,
                        pending: false,
                        error: false,
                        complete: true
                    })
                )
                .catch(() =>
                    setResponse({
                        data: null,
                        pending: false,
                        error: true,
                        complete: true
                    })
                );
        },
        [request]
    );
    return [response, (...args) => setRequest(fn(...args))];
}; */

/*export const useApi = ({url}) => {
    const [data, setData] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios
        .post(url, body, axiosPostConfig)
        .then(({ data }) => {
          setData(data);
          setIsLoading(false);
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
  
    return [isLoading, data, error]; 
};*/

/* export function PostNewUserEndpoint() {
    return UseApi(data => ({
        url: "http://localhost:8080/api/users/create",
        method: "POST",
        data
    }));
} */

/* export const postNewUsefrEndpoint = params => {
    if (!params) throw new Error("Must provide params!");
    const url = "http://localhost:8080/api/users/create";

    return axios.post(url, params, axiosPostConfig);
} */