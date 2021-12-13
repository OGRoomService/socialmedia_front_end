import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "./token";

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

export const GetUserProfilePicture = () => {
    return UseApi(data => ({
        headers: {
            'Authorization': 'Bearer ' + data
        },
        url: url + '/users/get_profile_picture',
        method: 'GET'
    }));
}

export const PostGetAllPosts = () => {
    return UseApi(data => ({
        method: 'get',
        url: url + '/posts/get_posts',
        headers: {
            'Authorization': data['Authorization']
        },
    }));
}

export function useAsyncAPI() {
    const { token } = useToken();

    async function pageUsers(username, page, count, callback) {
        if (!token) return;
        const uToken = token['access_token'];
        const response = await fetch(url + `/users/query_users_by?username=${username}&page=${page}&count=${count}`, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + uToken
            }
        })
            .then(data => {
                switch (data.status) {
                    case 200:
                    case 201:
                        return data.json();
                    default:
                        return null;
                }
            });
        callback(response);
    }

    async function userLogin(username, password, callback) {
        const response = await fetch(url + '/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
            .then(data => {
                switch (data.status) {
                    case 200:
                    case 201:
                        return data.json();
                    default:
                        return null;
                }
            });
        callback(response);
    }

    async function fetchUserProfile(username, setProfileData) {
        if (!token) return;
        const uToken = token['access_token'];
        const endpoint = `/users/get_by_name?username=${username}`;

        const response = await fetch(url + endpoint, {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + uToken
            }
        })
            .then(data => {
                switch (data.status) {
                    case 200:
                    case 201:
                        return data.json();
                    default:
                        return null
                }
            });

        setProfileData(response);
    }

    async function fetchProfilePicture(setProfilePicture) {
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(url + '/users/get_profile_picture', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + uToken
            }
        })
            .then(data => {
                return data.blob();
            });
        const imgURL = URL.createObjectURL(response);

        setProfilePicture(imgURL);
    }

    async function fetchProfilePictureFromId(userId, setProfilePicture) {
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(url + '/users/get_profile_picture_from_id', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": userId
            })
        })
            .then(data => {
                return data.blob();
            });
        const imgURL = URL.createObjectURL(response);

        setProfilePicture(imgURL);
    }

    async function createPost(text, buildNewPost) {
        const postText = text.trim();

        if (postText.length <= 0) return;
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(url + '/posts/create', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'post_text': postText
            })
        })
            .then(data => {
                return data.json();
            });
        buildNewPost(response);
    }

    async function createComment(text, postId, buildNewPost) {
        const postText = text.trim();

        if (postText.length <= 0) return;
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(url + '/posts/comment_on_post', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'post_id': postId,
                'comment_text': postText
            })
        })
            .then(data => {
                return data.json();
            });
        buildNewPost(response);
    }

    async function likePost(setNumLikes, setHasLiked, postId) {
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(url + '/posts/like_post', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'post_id': postId
            })
        })
            .then(data => {
                return data.json();
            });
        setNumLikes(response['likes']);
        if (response['liked'] === 'true') {
            setHasLiked(true);
        } else {
            setHasLiked(false);
        }
    }

    async function likeComment(setNumLikes, setHasLiked, commentId) {
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(url + '/comments/like_comment', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'comment_id': commentId
            })
        })
            .then(data => {
                return data.json();
            });
        setNumLikes(response['likes']);
        if (response['liked'] === 'true') {
            setHasLiked(true);
        } else {
            setHasLiked(false);
        }
    }

    async function deletePost(postId, callback) {
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(url + '/posts/delete_post', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'post_id': postId
            })
        })
            .then(data => {
                return data.json();
            });
        const failed = response['failed'];

        if (failed === 'false') {
            callback(postId);
        }
    }

    async function deleteComment(postId, commentId, callback) {
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(url + '/comments/delete_comment', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'post_id': postId,
                'comment_id': commentId
            })
        })
            .then(data => {
                return data.json();
            });
        const failed = response['failed'];

        if (failed === 'false') {
            callback(commentId);
        }
    }

    async function getUsername(setUsername, userId) {
        if (!token) return;
        const uToken = token['access_token'];

        const response = await fetch(url + '/users/get_username_from_id', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_id': userId
            })
        })
            .then(data => {
                return data.text();
            });
        setUsername(response);
    }

    async function pagePosts(userId, page, callback) {
        if (!token) return;
        const uToken = token['access_token'];
        const fetchConfig = {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + uToken
            }
        };
        let fetchEndpoint = '';

        if (userId) {
            fetchEndpoint = `/posts/page_posts_by_id?page=${page}&userId=${userId}`;
        } else {
            fetchEndpoint = `/posts/page_posts?page=${page}`;
        }
        const response = await fetch(url + fetchEndpoint, fetchConfig)
            .then(data => {
                switch (data.status) {
                    case 200:
                    case 201:
                        return data.json();
                    default:
                        return null
                }
            });
        callback(response);
    }

    return {
        fetchProfilePicture,
        createPost,
        likePost,
        getUsername,
        fetchProfilePictureFromId,
        createComment,
        deletePost,
        pagePosts,
        deleteComment,
        likeComment,
        fetchUserProfile,
        userLogin,
        pageUsers
    }
}

/* const parse = (fn) => {
    const data = fn['data'];
    let headers = axiosGetConfig['headers'];

    for(const[key, value] of Object.entries(data['headers'])) {
        headers[key] = value;
    }

    fn['headers'] = headers;
    delete fn['data'];
    return fn;
} */