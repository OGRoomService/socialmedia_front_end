import React, { useEffect, useState } from "react";
import '../styles/Header.css';
import { MoonIcon, Search2Icon, SunIcon } from '@chakra-ui/icons';
import { useHistory, /* useLocation */ } from "react-router";
import { BsHouse } from 'react-icons/bs';
import { BiCog } from 'react-icons/bi';
import {
    useColorMode,
    useColorModeValue,
    Input,
    Button,
    Box,
    Flex,
    IconButton,
    Avatar,
    Stack,
    InputGroup,
    InputLeftElement,
    Spacer,
    Center,
    Heading
} from "@chakra-ui/react"
import { currentUser } from "../api/user";
import { useToken } from "../api/token";

export const Header = () => {
    const { hasData } = currentUser();

    if (hasData()) {
        return (
            <LoggedInHeader />
        )
    } else {
        return (
            <LoggedOutHeader />
        )
    }
}

const LoggedOutHeader = () => {
    //const location = useLocation();

    return (
        <Box>
            <Box
                bg={useColorModeValue('gray.100', 'gray.700')}
                px={2}
                w='100%'
                position={'fixed'}
                zIndex={9999}
                boxShadow={'base'}
                h={16}
            >
                <Center w={'100%'} h={'100%'}>
                    <Heading>
                        Log In
                    </Heading>
                </Center>
            </Box>
            <Spacer pb={16} />
        </Box>
    )
}

const LoggedInHeader = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const { colorMode, toggleColorMode } = useColorMode();
    const { userData } = currentUser();
    const history = useHistory();
    const token = useToken();
    const baseUrl = 'http://rowanspace.xyz:8080/api';

    useEffect(() => {
        fetchProfilePicture();
    }, []);

    async function fetchProfilePicture() {
        if (!token.token) return;
        const uToken = JSON.parse(token.token)['access_token'];

        const response = await fetch(baseUrl + '/users/get_profile_picture', {
            method: 'get',
            headers: {
                'Authorization': 'Bearer ' + uToken
            }
        })
            .then(data => {
                return data.blob();
            });
        const imgURL = URL.createObjectURL(response);

        setProfilePicture(imgURL);
    }

    return (
        <Box>
            <Box
                bg={useColorModeValue('gray.100', 'gray.700')}
                px={2}
                w='100%'
                position={'fixed'}
                zIndex={9999}
                boxShadow={'base'}
            >
                <Flex h={16} alignItems={'center'}>
                    <Stack w={'100%'} direction={'row'}>
                        <IconButton
                            icon={<BsHouse />}
                            rounded={'full'}
                            onClick={() =>
                                history.push('/')
                            }
                        />
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents={'none'}
                                children={<Search2Icon color={useColorModeValue('gray.700', 'gray.100')} />}
                            />
                            <Input
                                placeholder={'Search content...'}
                                rounded={'full'}
                            />
                        </InputGroup>
                        <Stack direction={'row'} spacing={1}>
                            <Button
                                leftIcon={<Avatar
                                    size={'sm'}
                                    src={profilePicture}
                                />}
                                p={1}
                                pr={2}
                                rounded={'full'}
                                onClick={() =>
                                    history.push(`/u/${userData['username']}`)
                                }
                            >
                                {userData['username']}
                            </Button>
                            <Button
                                onClick={toggleColorMode}
                                rounded={'full'}
                            >
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            <IconButton
                                icon={<BiCog />}
                                rounded={'full'}
                                onClick={() =>
                                    history.push('/settings')
                                }
                            />
                        </Stack>
                    </Stack>
                </Flex>
            </Box>
            <Spacer pb={16} />
        </Box>
    )
}