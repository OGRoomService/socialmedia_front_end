import React, { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import {
    Box,
    Heading,
    useColorModeValue,
    Text,
    IconButton,
    Stack,
    Center,
    Spacer
} from "@chakra-ui/react";
import { useAsyncAPI } from "../../api/api";

export const Comment = ({ commentData }) => {
    const [numLikes, setNumLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [username, setUsername] = useState('');
    const { getUsername } = useAsyncAPI();


    console.log(commentData.commentData);
    console.log(commentData['comment_text']);

    useEffect(() => {
        getUsername(setUsername, commentData['commenter_id']);
    }, []);

    return (
        <Box>
            <Stack
                direction={'row'}
            >
                <Center
                    h={'100%'}
                    w={'100%'}
                >
                    <Text
                        fontSize={'sm'}
                        fontWeight={'bold'}
                    >
                        {`${username}: `}
                    </Text>
                    <Text
                        fontSize={'sm'}
                        fontWeight={'normal'}
                    >
                        {commentData['comment_text']}
                    </Text>
                    <Spacer />
                    <IconButton
                        h={4}
                        variant={'ghost'}
                        icon={
                            hasLiked ?
                                <BsHeartFill
                                    color='red'
                                /> :
                                <BsHeart
                                    color='currentColor'
                                />
                        }

                        onClick={() =>
                            console.log('yup')
                        }
                        _hover={{ color: 'gray', stroke: 'gray' }}
                        _active={{}}
                        _focus={{}}
                    />
                </Center>
            </Stack>
        </Box>
    )
}