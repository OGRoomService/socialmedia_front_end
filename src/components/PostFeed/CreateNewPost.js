import React, { useEffect, useState } from "react";
import ResizeTextarea from "react-textarea-autosize";
import {
    Box,
    useColorModeValue,
    Text,
    Avatar,
    Stack,
    Textarea,
    Spacer,
    Divider,
    Center,
    Button
} from "@chakra-ui/react";
import { useToken } from "../../api/token";
import { useAsyncAPI } from "../../api/api"

export const CreateNewPost = ({ buildNewPost }) => {
    const [text, setText] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const { fetchProfilePicture, createPost } = useAsyncAPI();

    useEffect(() => {
        fetchProfilePicture(setProfilePicture);
    }, []);

    const updateField = (e) => {
        const target = e.target;
        const fieldValue = target.value;

        if (fieldValue.length <= 255) {
            setText(fieldValue);
        } else {
            target.value = text;
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
                p={3}
            >
                <Text
                    fontSize={'md'}
                    fontWeight={'bold'}
                >
                    Create a post:
                </Text>
                <Center
                    pt={2}
                    pb={4}
                >
                    <Divider />
                </Center>
                <Stack
                    direction={'row'}
                >
                    <Avatar
                        size={'sm'}
                        mt={1}
                        src={profilePicture}
                    />
                    <Stack
                        w={'100%'}
                    >
                        <Textarea
                            minH="unset"
                            overflow="hidden"
                            w="100%"
                            resize="none"
                            minRows={1}
                            as={ResizeTextarea}
                            placeholder={'What\'s on your mind?'}
                            onChange={(e) =>
                                updateField(e)
                            }
                        />
                        <Stack
                            direction={'row'}
                        >
                            <Button
                                onClick={() => {
                                    createPost(text, buildNewPost)
                                }}
                            >
                                Post
                            </Button>
                            <Spacer />
                            <Center>
                                <Text
                                    color={useColorModeValue('gray.300', 'gray.600')}
                                >
                                    {text.length}/255 chars
                                </Text>
                            </Center>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}