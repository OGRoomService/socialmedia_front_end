import React, { useEffect, useState } from "react";
import { useToken } from "../../api/token";
import { NewPost } from "./NewPost";
import { NoPosts } from './NoPosts';
import { CreateNewPost } from './CreateNewPost';
import { useLocation } from "react-router";
import { currentUser } from "../../api/user";
import {
    List,
    Box
} from "@chakra-ui/react"

export const PostFeed = () => {
    const [postObjects, setPostObjects] = useState({
        hasPosts: false,
        posts: []
    });
    const { userData } = currentUser();
    const token = useToken();
    const location = useLocation();

    useEffect(() => {
        getPostData(location.pathname);
    }, []);

    async function getPostData(pathname) {
        if (!token.token) return;
        const uToken = JSON.parse(token.token)['access_token'];
        let fetchUrl = '';
        let fetchConfig = '';

        switch (pathname) {
            case '/profile':
                fetchUrl = 'http://rowanspace.xyz:8080/api/posts/get_posts_from_id';
                fetchConfig = {
                    method: 'post',
                    headers: {
                        'Authorization': 'Bearer ' + uToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'user_id': userData['id']
                    })
                };
                break;
            default:
                fetchUrl = 'http://rowanspace.xyz:8080/api/posts/get_posts';
                fetchConfig = {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + uToken
                    }
                };
        }

        const response = await fetch(fetchUrl, fetchConfig)
            .then(data => {
                return data.json();
            });
        buildPosts(response);
    }

    const buildNewPost = (data) => {
        const newPosts =
            [<NewPost
                key={data['post_id']}
                postData={data}
            />].concat(postObjects.posts);
        setPostObjects({
            hasPosts: true,
            posts: newPosts
        });
    }

    const buildPosts = (data) => {
        const posts = data.map((postData) => {
            return <NewPost
                key={postData['post_id']}
                postData={postData}
            />
        });
        let hasPosts = false;

        if (posts.length > 0) {
            hasPosts = true;
        }
        setPostObjects({
            hasPosts: hasPosts,
            posts: posts
        });
    }

    return (
        <Box w='100%' p='1'>
            <CreateNewPost buildNewPost={buildNewPost} />
            {
                postObjects.hasPosts ?
                    <List>
                        {postObjects.posts}
                    </List> :
                    <NoPosts />
            }
        </Box>
    );
}