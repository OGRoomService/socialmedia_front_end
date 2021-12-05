import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import { PostFeed } from "./PostFeed/PostFeed";
import {
    Spacer,
    Box,
    Center
} from "@chakra-ui/react"

export const MainPage = (token) => {
    return (
        <Box>
            <Header />
            <Spacer p={4} />
            <Center w={'100%'}>
                <Center w={'45%'}>
                    <PostFeed />
                </Center>
            </Center>
            <Footer />
        </Box>
    )
};