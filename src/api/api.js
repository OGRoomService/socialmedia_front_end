import { useState, useEffect } from "react";
import axios from "axios";

const url = 'http://rowanspace.xyz:8080/api'

const axiosGetConfig = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
    },
    mode: 'cors'
}

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

export const GetAllPosts = () => {
    return (
        [
            {
                "post_id": 11,
                "poster_id": 6,
                "original_poster_id": 6,
                "post_text": "testing1",
                "postPictureLink": null,
                "likes": 0,
                "usersThatLiked": [],
                "dislikes": 0,
                "usersThatDisliked": [],
                "post_comments": [],
                "post_date": "2021-11-22T03:24:58.254+00:00"
            },
            {
                "post_id": 12,
                "poster_id": 6,
                "original_poster_id": 6,
                "post_text": "testing2",
                "postPictureLink": null,
                "likes": 0,
                "usersThatLiked": [],
                "dislikes": 0,
                "usersThatDisliked": [],
                "post_comments": [],
                "post_date": "2021-11-22T03:25:12.380+00:00"
            },
            {
                "post_id": 13,
                "poster_id": 6,
                "original_poster_id": 6,
                "post_text": "testing3",
                "postPictureLink": null,
                "likes": 0,
                "usersThatLiked": [],
                "dislikes": 0,
                "usersThatDisliked": [],
                "post_comments": [],
                "post_date": "2021-11-22T03:25:14.492+00:00"
            },
            {
                "post_id": 14,
                "poster_id": 6,
                "original_poster_id": 6,
                "post_text": "testing4",
                "postPictureLink": null,
                "likes": 0,
                "usersThatLiked": [],
                "dislikes": 0,
                "usersThatDisliked": [],
                "post_comments": [],
                "post_date": "2021-11-22T03:25:16.726+00:00"
            },
            {
                "post_id": 15,
                "poster_id": 6,
                "original_poster_id": 6,
                "post_text": "testing5",
                "postPictureLink": null,
                "likes": 0,
                "usersThatLiked": [],
                "dislikes": 0,
                "usersThatDisliked": [],
                "post_comments": [],
                "post_date": "2021-11-22T03:25:20.352+00:00"
            },
            {
                "post_id": 16,
                "poster_id": 6,
                "original_poster_id": 6,
                "post_text": "testing6",
                "postPictureLink": null,
                "likes": 0,
                "usersThatLiked": [],
                "dislikes": 0,
                "usersThatDisliked": [],
                "post_comments": [],
                "post_date": "2021-11-22T03:25:22.510+00:00"
            }
        ]
    )
}

/* export const GetAllPosts = () => {
    return UseApi(data => ({
        config: axiosGetConfig,
        url: url + '/posts/get_posts',
        method: 'GET',
        headers: data
    }));
} */

export const PostResetPasswordEndpoint = () => {
    return UseApi(data => ({
        config: axiosPostConfig,
        url: url + '/users/reset_password',
        method: 'POST',
        data
    }));
}

export const PostForgotPasswordEndpoint = () => {
    return UseApi(data => ({
        config: axiosPostConfig,
        url: url + '/users/forgot_password',
        method: 'POST',
        data
    }));
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