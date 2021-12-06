import React, { useEffect, useState } from "react";
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
    useColorModeValue,
    Spacer
} from "@chakra-ui/react"
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Button } from "@chakra-ui/react"
import { GetUserProfilePicture } from '../../api/api'
import { useToken } from "../../api/token";
import { currentUser } from "../../api/user";

export const NewPost = ({ postData }) => {
    const baseUrl = 'http://rowanspace.xyz:8080/api';
    const token = useToken();
    const { userData } = currentUser();
    const [posterData, setPosterData] = useState({
        test: ''
    });
    const [numLikes, setNumLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [date, setDate] = useState('');

    useEffect(() => {
        //getPosterData();
        setNumLikes(postData['likes']);

        if (postData['usersThatLiked'].includes(userData['id'])) {
            setHasLiked(true);
        }
        const postTime = Date.parse(postData['post_date']);
        const now = Date.now();
        const dateDiffInSec = Math.abs((now - postTime) / 1000);
        const secondsInDay = (60 * 60 * 24)
        const secondsInMonth = (secondsInDay * 30);
        let date = '';

        if (dateDiffInSec < (60 * 60 * 24)) {
            if (dateDiffInSec < 60) {
                date = `${dateDiffInSec.toFixed(0)} seconds ago`;
            } else if (dateDiffInSec < 60 * 60) {
                date = `${(dateDiffInSec / 60).toFixed(0)} minutes ago`;
            } else {
                date = `${(dateDiffInSec / (60 * 60)).toFixed(0)} hours ago`;
            }
        } else if (dateDiffInSec < secondsInMonth) {
            date = `${(dateDiffInSec / secondsInDay).toFixed(0)} days ago`;
        } else {
            const newDate = new Date(postTime).toLocaleDateString();

            date = `${newDate}`;
        }
        setDate(date);
    }, []);

    async function getPosterData() {
        if (!token.token) return;
        const uToken = JSON.parse(token.token)['access_token'];

        const response = await fetch(baseUrl + '/users/get_self', {
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

        const response = await fetch(baseUrl + '/posts/like_post', {
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
        setNumLikes(response['likes']);
        if (response['liked'] === 'true') {
            setHasLiked(true);
        } else {
            setHasLiked(false);
        }
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
                    <Spacer />
                    <Text
                        fontSize={'sm'}
                        fontWeight={'normal'}
                    >
                        {date}
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