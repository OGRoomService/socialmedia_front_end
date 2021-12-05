import React, { Component, useEffect, useState } from "react";
import {
    Flex,
    Box,
    Input,
    Avatar,
    HStack,
    Text,
    Divider,
    Center,
    IconButton,
    useColorModeValue
} from "@chakra-ui/react"
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Button } from "@chakra-ui/react"
import { GetUserProfilePicture } from '../../api/api'
import { useToken } from "../../api/token";

export const NewPost = ({ postData }) => {
    const baseUrl = 'http://rowanspace.xyz:8080/api';
    const token = useToken();
    const [posterData, setPosterData] = useState({
        test: ''
    });
    const [numLikes, setNumLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        //getPosterData();
        console.log(postData);
    }, []);

    async function getPosterData() {
        if (!token.token) return;
        const uToken = JSON.parse(token.token)['access_token'];

        const response = await fetch (baseUrl + '/users/get_self', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + uToken
            }
        })
        .then(data => {
            return data.json();
        });
        console.log(response);
        setPosterData({
            username: response['username'],
            email: response['email']
        })
    }

    async function likePost() {
        if (!token.token) return;
        const uToken = JSON.parse(token.token)['access_token'];

        const response = await fetch (baseUrl + '/posts/like_post', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'post_id': postData['post_id']
            })
        })
        .then(data => {
            return data.json();
        });
        console.log(response);
        setNumLikes(response.length);
    }


    return (
        <Box
            mb='5'
            borderWidth="1px"
            borderRadius="lg"
            bg={useColorModeValue('gray.100', 'gray.700')}
        >
            <Box
                p="3"
                fontWeight="semibold"
            >
                <HStack spacing='30px'>
                    <Avatar
                        size='sm'
                    />
                    <Text>
                        testName
                    </Text>
                </HStack>
                <Center h='20px'>
                    <Divider />
                </Center>
                <Flex>
                    <Text fontSize='sm'>
                        {postData['post_text']}
                    </Text>
                </Flex>
                <Center h='20px'>
                    <Divider />
                </Center>
                <HStack>
                    <IconButton
                        variant='ghost'
                        icon={
                            hasLiked ? <BsHeartFill color='red' /> : <BsHeart color='currentColor' />
                        }
                        onClick={() =>
                            likePost()
                        }
                        _hover={{ color: 'gray', stroke: 'gray' }}
                        _active={{}}
                        _focus={{}}
                    />
                    <Text fontSize='sm'>
                        {numLikes} likes
                    </Text>
                </HStack>
                <HStack>
                    <Input
                        placeholder='Add a comment...'
                    >
                    </Input>
                    <Button>
                        Post
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}