import React, { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go';
import {
    Box,
    Text,
    IconButton,
    Stack,
    Spacer,
    Link
} from "@chakra-ui/react";
import { useAsyncAPI } from "../../api/api";
import { currentUser } from "../../api/user";

export const Comment = ({ commentData, postId, unrenderComment }) => {
    const [numLikes, setNumLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [username, setUsername] = useState('');
    const { getUsername, deleteComment } = useAsyncAPI();
    const { userData } = currentUser();
    const { likeComment } = useAsyncAPI();

    useEffect(() => {
        getUsername(setUsername, commentData['commenter_id']);
        setNumLikes(commentData['likes']);

        if (commentData['usersThatLiked'].includes(userData['id'])) {
            setHasLiked(true);
        }
    }, []);

    const ShowDeleteButton = () => {
        let hasAdmin = false;

        userData['roles'].forEach(x => {
            if (x.name === "ROLE_ADMIN") {
                hasAdmin = true;
            }
        });
        if (commentData['commenter_id'] === userData['id'] ||
                hasAdmin) {
            return (
                <IconButton
                    h={6}
                    w={4}
                    minW={4}
                    ml={4}
                    variant={'ghost'}
                    icon={<GoTrashcan />}
                    onClick={() =>
                        deleteComment(postId, commentData['comment_id'], unrenderComment)
                    }
                    _hover={{ color: 'gray', stroke: 'gray' }}
                    _active={{}}
                    _focus={{}}
                />
            )
        }
        return;
    }

    return (
        <Box>
            <Stack
                direction={'row'}
                h={'100%'}
                w={'100%'}
            >
                <Link
                    fontSize={'sm'}
                    fontWeight={'bold'}
                    top={0}
                    href={`/u/${username}`}
                >
                    {`${username}: `}
                </Link>
                <Text
                    fontSize={'sm'}
                    fontWeight={'normal'}
                    wordBreak={'break-word'}
                >
                    {commentData['comment_text']}
                </Text>
                <Spacer />
                <Text
                    fontSize={'sm'}
                >
                    {numLikes}
                </Text>
                <IconButton
                    h={6}
                    w={4}
                    minW={4}
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
                        likeComment(setNumLikes, setHasLiked, commentData['comment_id'])
                    }
                    _hover={{ color: 'gray', stroke: 'gray' }}
                    _active={{}}
                    _focus={{}}
                />
                {ShowDeleteButton()}
                <Stack />
            </Stack>
        </Box >
    )
}