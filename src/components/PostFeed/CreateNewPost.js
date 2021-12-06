import React, { useState } from "react";
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

export const CreateNewPost = ({buildNewPost}) => {
    const [text, setText] = useState('');
    const token = useToken();

    const updateField = (e) => {
        const target = e.target;
        const fieldValue = target.value

        if (fieldValue.length <= 255) {
            setText(fieldValue);
        } else {
            target.value = text;
        }
    }

    async function createPost() {
        if (text.length <= 0) return;
        if (!token.token) return;
        const uToken = JSON.parse(token.token)['access_token'];

        const response = await fetch ('http://rowanspace.xyz:8080/api/posts/create', {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + uToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'post_text': text
            })
        })
        .then(data => {
            return data.json();
        });
        console.log(response);
        buildNewPost(response);
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
                                onClick={createPost}
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