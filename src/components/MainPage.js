import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import { PostFeed } from "./PostFeed/PostFeed";
import {
    Spacer,
    Flex,
    Box,
    Text
} from "@chakra-ui/react"

export const MainPage = (token) => {
    return (
        <Box>
            <Header />
            <Flex>
                    <Box w='33%'/>
                    <Spacer p='10' />
                    <PostFeed />
                    <Spacer p='10' />
                    <Box w='33%'/>
            </Flex>
            <Footer />
        </Box>
    )
};