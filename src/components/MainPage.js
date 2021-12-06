import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import { PostFeed } from "./PostFeed/PostFeed";
import {
    Spacer,
    Box,
    Center,
    Flex
} from "@chakra-ui/react"

export const MainPage = () => {
    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
        >
            <Box>
                <Header />
                <Spacer p={2} />
                <Center w={'100%'}>
                    <Center w={{
                        base: '97%',
                        lg: '45%'
                    }}>
                        <PostFeed />
                    </Center>
                </Center>
            </Box>
            <Footer />
        </Flex>
    )
};