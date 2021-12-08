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
    Button,
    Center,
    useColorModeValue
} from "@chakra-ui/react"
import { PostFeed } from "./PostFeed/PostFeed";
import { currentUser } from "../api/user";
import { useAsyncAPI } from "../api/api";


export default function ProfilePage() {
    const [profilePicture, setProfilePicture] = useState(null);
    const { fetchProfilePicture } = useAsyncAPI();
    const userData = currentUser();

    useEffect(() => {
        fetchProfilePicture(setProfilePicture);
    }, []);

    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
        >
            <Box>
                <Header />
                <Flex
                    bg={useColorModeValue('gray.100', 'gray.700')}
                    p={4}
                    boxShadow={'base'}
                >
                    <Center w='67%'>
                        <Stack
                            direction={'row'}
                            align={'center'}
                        >
                            <Button
                                size={'2xl'}
                                variant={"ghost"}
                                _hover={{}}
                                _active={{}}
                                _focus={{}}
                            >
                                <Avatar
                                    size={'2xl'}
                                    src={profilePicture}
                                    _hover={{ color: 'gray' }}
                                    variant='alsdf;'
                                />
                            </Button>
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
                            base: '97%',
                            lg: '45%'
                        }}>
                            <Stack w={'100%'}>
                                <Spacer pt={2} />
                                <PostFeed />
                            </Stack>
                        </Center>
                    </Center>
                </Flex>
            </Box>
            <Footer />
        </Flex>
    )
}