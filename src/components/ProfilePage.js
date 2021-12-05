import React from "react";
import Footer from "./Footer";
import { Header } from "./Header";
import "../styles/main.css";
import {
    Box,
    Flex,
    Avatar,
    Spacer,
    Stack,
    Text,
    Divider,
    Center,
    useColorModeValue
} from "@chakra-ui/react"
import { PostFeed } from "./PostFeed/PostFeed";


export default function ProfilePage() {
    return (
        <Box>
            <Header />
            <Flex
                bg={useColorModeValue('gray.100', 'gray.700')} p={4}
                boxShadow={'base'}
            >
                <Center w='67%'>
                    <Stack
                        direction={'row'}
                        align={'center'}
                    >
                        <Avatar size={'2xl'} />
                        <Text
                            p={3}
                            fontSize='3xl'
                        >
                            Name
                        </Text>
                    </Stack>
                </Center>
            </Flex>
            <Flex w='100%'>
                <Box w='33%' />
                <Spacer p='10' />
                <Box w='100%'>
                    <Spacer p={3} />
                    <PostFeed />
                </Box>
                <Spacer p='10' />
                <Box w='33%' />
            </Flex>
            <Footer />
        </Box>
    )
}