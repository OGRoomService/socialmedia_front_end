import React, { useEffect, useRef, useState } from "react";
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
import { useAsyncAPI } from "../../api/api";

export const PostFeed = () => {
    const [postObjects, setPostObjects] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const { userData } = currentUser();
    const { getPostData } = useAsyncAPI();
    const stateRef = useRef();
    const token = useToken();
    const location = useLocation();

    stateRef.current = postObjects;

    useEffect(() => {
        getPostData(location.pathname, userData['id'], buildPosts);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        const innerHeight = window.innerHeight;
        const scrollTop = document.documentElement.scrollTop;
        const offsetHeight = document.documentElement.offsetHeight;
        const bottomBuffer = offsetHeight / 5

        if (innerHeight + scrollTop < (offsetHeight - bottomBuffer)) return;

        console.log("FETCHING");
    }

    const buildNewPost = (data) => {
        const newPosts =
            [<NewPost
                key={data['post_id']}
                postData={data}
                unrenderPost={unrenderPost}
            />].concat(postObjects);
        setPostObjects(newPosts);
    }

    const buildPosts = (data) => {
        const posts = data.map((postData) => {
            return <NewPost
                key={postData['post_id']}
                postData={postData}
                unrenderPost={unrenderPost}
            />
        });
        setPostObjects(posts);
    }

    const unrenderPost = (postId) => {
        const objects = stateRef.current.filter(obj => obj.key != postId);

        setPostObjects(objects);
    }

    const renderPosts = () => {
        if (postObjects.length <= 0) {
            return (
                <NoPosts />
            )
        } else {
            return (
                <List>
                    {postObjects}
                </List>
            )
        }
    }

    return (
        <Box w='100%' p='1'>
            <CreateNewPost buildNewPost={buildNewPost} />
            {renderPosts()}
        </Box>
    );
}