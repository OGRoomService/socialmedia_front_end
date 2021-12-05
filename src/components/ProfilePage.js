import React, { useEffect, useState } from "react";
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
import { useToken } from "../api/token";
import { currentUser } from "../api/user";


export default function ProfilePage() {
    const token = useToken();
    const userData = currentUser();

    useEffect(() =>{
        console.log("Wait is this working???")
        console.log(userData);
        console.log("MAYBEEEEE")
        console.log(userData.userData);
    }, []);

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
                            {userData ? userData.userData['username'] : '...'}
                        </Text>
                    </Stack>
                </Center>
            </Flex>
            <Flex w='100%'>
                <Center w={'100%'}>
                    <Center w={{
                        base:'97%',
                        lg:'45%'
                }}>
                        <Stack w={'100%'}>
                            <Spacer pt={5} />
                            <PostFeed />
                        </Stack>
                    </Center>
                </Center>
            </Flex>
            <Footer />
        </Box>
    )
}