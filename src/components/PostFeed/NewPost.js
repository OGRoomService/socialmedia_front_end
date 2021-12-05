import React, { Component, useEffect, useState } from "react";
import {
    Flex,
    Box,
    Spacer,
    Input,
    Avatar,
    HStack,
    Text,
    Divider,
    Center,
    IconButton,
    PseudoBox,
    Icon
} from "@chakra-ui/react"
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Button } from "@chakra-ui/react"

export const NewPost = ({ postData }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <Box mb='5' borderWidth="1px" borderRadius="lg">
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
                        Post Text
                    </Text>
                </Flex>
                <Center h='20px'>
                    <Divider />
                </Center>
                <HStack>
                    <IconButton
                        variant='ghost'
                        icon={
                            isLiked ? <BsHeartFill color='red' /> : <BsHeart color='currentColor' />
                        }
                        onClick={() =>
                            isLiked ? setIsLiked(false) : setIsLiked(true)
                        }
                        _hover={{ color: 'gray', stroke: 'gray' }}
                        _active={{}}
                        _focus={{}}
                    />
                    <Text fontSize='sm'>
                        x likes
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