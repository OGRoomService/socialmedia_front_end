import React, { useEffect, useRef, useState } from "react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go';
import ResizeTextarea from "react-textarea-autosize";
import { Button } from "@chakra-ui/react"
import { useAsyncAPI } from '../../api/api'
import { currentUser } from "../../api/user";
import { Comment } from "./Comment";
import {
    Flex,
    Box,
    Textarea,
    Avatar,
    HStack,
    Text,
    Divider,
    Center,
    IconButton,
    useColorModeValue,
    Spacer,
    List
} from "@chakra-ui/react"

export const NewPost = ({ postData, unrenderPost }) => {
    const [numLikes, setNumLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const [date, setDate] = useState('');
    const { likePost, getUsername, fetchProfilePictureFromId } = useAsyncAPI();
    const { createComment, deletePost } = useAsyncAPI();
    const { userData } = currentUser();
    const stateRef = useRef();

    stateRef.current = comments;

    useEffect(() => {
        setNumLikes(postData['likes']);

        if (postData['usersThatLiked'].includes(userData['id'])) {
            setHasLiked(true);
        }
        fetchProfilePictureFromId(postData['poster_id'], setProfilePicture);
        parsePostDate();
        getUsername(setUsername, postData['poster_id']);
        buildComments();
    }, []);

    const updateField = (e) => {
        const target = e.target;
        const fieldValue = target.value;

        if (fieldValue.length <= 255) {
            setCommentText(fieldValue);
        } else {
            target.value = commentText;
        }
    }

    const parsePostDate = () => {
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
    }

    const buildNewComment = (data) => {
        const newComment =
            <Comment
                key={data['comment_id']}
                commentData={data}
                postId={postData['post_id']}
                unrenderComment={unrenderComment}
            />
        const newArray = [...comments, newComment];

        setComments(newArray);
    }

    const buildComments = () => {
        const arrComments = postData['post_comments'];

        const comments = arrComments.map((commentData) => {
            return <Comment
                key={commentData['comment_id']}
                commentData={commentData}
                postId={postData['post_id']}
                unrenderComment={unrenderComment}
            />
        });
        setComments(comments);
    }

    const unrenderComment = (commentId) => {
        const objects = stateRef.current.filter(obj => obj.key != commentId);

        setComments(objects);
    }

    const ShowDelete = () => {
        if (userData['id'] === postData['poster_id']) {
            return (
                <IconButton
                    variant={'ghost'}
                    icon={<GoTrashcan />}
                    onClick={() =>
                        deletePost(postData['post_id'], unrenderPost)
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
                <HStack
                    spacing='15px'
                    mb={3}
                >
                    <Avatar
                        size='sm'
                        src={profilePicture}
                    />
                    <Text>
                        {username}
                    </Text>
                    <Spacer />
                    {ShowDelete()}
                </HStack>
                <Flex>
                    <Text
                        fontSize='sm'
                        fontWeight='normal'
                        wordBreak={'break-all'}
                    >
                        {postData['post_text']}
                    </Text>
                </Flex>
                <Divider
                    mt={3}
                />
                <HStack>
                    <IconButton
                        variant={'ghost'}
                        icon={
                            hasLiked ?
                                <BsHeartFill
                                    transform={'scale(1.5)'}
                                    color='red'
                                /> :
                                <BsHeart
                                    transform={'scale(1.5)'}
                                    color='currentColor'
                                />
                        }
                        onClick={() =>
                            likePost(setNumLikes, setHasLiked, postData['post_id'])
                        }
                        _hover={{ color: 'gray', stroke: 'gray' }}
                        _active={{}}
                        _focus={{}}
                    />
                    <Center
                        h={'100%'}
                        w={'100%'}
                    >
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
                    </Center>
                </HStack>
                <Divider />
                <List
                    mt={3}
                    mb={3}
                >
                    {comments}
                </List>
                <HStack>
                    <Textarea
                        minH="unset"
                        overflow="hidden"
                        w="100%"
                        resize="none"
                        minRows={1}
                        as={ResizeTextarea}
                        placeholder={'Write a comment...'}
                        onChange={(e) =>
                            updateField(e)
                        }
                    />
                    <Button
                        onClick={() => {
                            createComment(commentText, postData['post_id'], buildNewComment)
                        }}
                    >
                        Post
                    </Button>
                </HStack>
            </Box>
        </Box>
    )
}