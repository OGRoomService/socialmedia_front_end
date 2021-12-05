import React, { Component } from "react";
import '../styles/Header.css';
import { MoonIcon, Search2Icon, SunIcon } from '@chakra-ui/icons';
import { useToken } from "../api/token";
import { useHistory, useLocation } from "react-router";
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


export const Header = () => {
    const token = useToken();
    let accessToken = null;

    const logout = () => {
        token.deleteToken();
        history.go(0);
    }

    if (token.token) {
        accessToken = JSON.parse(token.token)['access_token'];
    }

    if (accessToken) {
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
    const location = useLocation();
    
    return (
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
    )
}

const LoggedInHeader = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const history = useHistory();

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
                                leftIcon={<Avatar size={'sm'} />}
                                p={1}
                                pr={2}
                                rounded={'full'}
                                onClick={() =>
                                    history.push('/profile')
                                }
                            >
                                Name
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