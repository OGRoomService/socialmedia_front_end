import React, { Component, useEffect, useState } from "react";
import { GetAllPosts, PostGetAllPosts } from "../../api/api";
import { useToken } from "../../api/token";
import { NewPost } from "./NewPost";
import {
    List,
    Flex,
    Box
} from "@chakra-ui/react"
import axios from "axios";

export const PostFeed = () => {
    const [postObjects, setPostObjects] = useState(null);
    const token = useToken();

    useEffect(() => {
        getPostData()
    }, []);

    async function getPostData() {
        if (!token.token) return;
        const uToken = JSON.parse(token.token)['access_token'];

        const response = await fetch ('http://rowanspace.xyz:8080/api/posts/get_posts', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + uToken
            }
        })
        .then(data => {
            return data.json();
        });
        buildPosts(response);
    }

    const buildPosts = (data) => {
        console.log(data);
        const posts = data.map((postData) => {
            return <NewPost key={data['post_id']} postData={postData} />
        });
        setPostObjects(posts);
    }

    return (
        <Box w='100%' p='1'>
            <List>
                {postObjects}
            </List>
        </Box>
    );
}