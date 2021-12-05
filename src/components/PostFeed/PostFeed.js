import React, { Component, useEffect, useState } from "react";
import { Button, Flex, Heading, Circle, Input, Spacer, List, Box } from "@chakra-ui/react"
import { GetAllPosts } from "../../api/api";
import { useToken } from "../../api/token";
import { NewPost } from "./NewPost";

export const PostFeed = () => {
    const [postData, setPostData] = useState([
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
    ]);
    const [postObjects, setPostObjects] = useState(null);
    const token = useToken();

    useEffect(() => {
        getPostData();
        buildPosts();
    }, []);

    async function getPostData() {
        /* await setPostData({
            "Authorization": "Bearer " + token.token
        });

        console.log(postData); */
    }

    const buildPosts = () => {
        console.log(postData);
        const posts = postData.map((data) => {
            return <NewPost postData={data} />
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