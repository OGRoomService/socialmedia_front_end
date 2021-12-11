import React, { useEffect, useState } from "react";
import { ArrowBackIcon, ChevronRightIcon, Icon, MoonIcon, Search2Icon, SunIcon } from '@chakra-ui/icons';
import { useHistory, /* useLocation */ } from "react-router";
import { BsHouse } from 'react-icons/bs';
import { BiCog } from 'react-icons/bi';
import { GiExitDoor } from 'react-icons/gi';
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
    Text,
    InputGroup,
    InputLeftElement,
    Spacer,
    Center,
    Heading,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverBody,
    RadioGroup,
    Radio
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
    const [popoverPage, setPopoverPage] = useState('');
    const { colorMode, setColorMode } = useColorMode();
    const { userData } = currentUser();
    const { token, deleteToken } = useToken();
    const { deleteUser } = currentUser();
    const history = useHistory();
    const baseUrl = 'http://rowanspace.xyz:8080/api';

    useEffect(() => {
        fetchProfilePicture();
    }, []);

    async function fetchProfilePicture() {
        if (!token) return;
        const uToken = token['access_token'];

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

    const popover = () => {
        return (
            <Popover>
                <PopoverTrigger>
                    <IconButton
                        icon={<BiCog />}
                        rounded={'full'}
                        onFocus={() => {
                            setPopoverPage('');
                        }}
                    />
                </PopoverTrigger>
                {grabPopoverContent()}
            </Popover>
        )
    }

    const grabPopoverContent = () => {
        switch (popoverPage) {
            case 'display':
                return displayPopoverContent();
            default:
                return mainPopoverContent();
        }
    }

    const mainPopoverContent = () => {
        return (
            <PopoverContent
                right={'0.5rem'}
                bg={useColorModeValue('gray.100', 'gray.700')}
                color={useColorModeValue('gray.700', 'gray.100')}
                _focus={{}}
            >
                <PopoverArrow />
                <PopoverHeader>
                    <Button
                        w={'100%'}
                        variant={'ghost'}
                        justifyContent={'left'}
                        h={'62'}
                        onClick={() =>
                            history.push(`/u/${userData['username']}`)
                        }
                    >
                        <Stack
                            direction={'row'}
                        >
                            <Avatar
                                left={0}
                                size={'md'}
                                src={profilePicture}
                            />
                            <Stack
                                direction={'column'}
                                justifyContent={'left'}
                                pl={4}
                                pt={1}
                                spacing={1}
                            >
                                <Text
                                    textAlign={'left'}
                                >
                                    {userData['username']}
                                </Text>
                                <Text
                                    textAlign={'left'}
                                    fontSize={'sm'}
                                    fontWeight={'normal'}
                                >
                                    See your profile
                                </Text>
                            </Stack>
                        </Stack>
                    </Button>
                </PopoverHeader>
                <PopoverBody>
                    <Button
                        w={'100%'}
                        variant={'ghost'}
                        justifyContent={'left'}
                        h={'10'}
                        onClick={() =>
                            setPopoverPage('display')
                        }
                    >
                        <Stack
                            direction={'row'}
                            w={'100%'}
                            h={'100%'}
                        >
                            <Center
                                w={'100%'}
                                h={'100%'}
                            >
                                {colorMode === 'light' ?
                                    <SunIcon
                                        pt={1}
                                        left={0}
                                    /> :
                                    <MoonIcon
                                        left={0}
                                        pt={1}
                                    />}
                                <Text
                                    pl={3}
                                >
                                    Display
                                </Text>
                                <Spacer />
                                <ChevronRightIcon
                                    w={8}
                                    h={8}
                                />

                            </Center>
                        </Stack>
                    </Button>
                    <Button
                        w={'100%'}
                        variant={'ghost'}
                        justifyContent={'left'}
                        h={'10'}
                        onClick={() =>
                            userLogout()
                        }
                    >
                        <Stack
                            direction={'row'}
                            w={'100%'}
                            h={'100%'}
                        >
                            <Center
                                h={'100%'}
                            >
                                <GiExitDoor
                                    left={0}
                                />
                                <Text
                                    pl={3}
                                >
                                    Log out
                                </Text>
                            </Center>
                        </Stack>
                    </Button>
                </PopoverBody>
            </PopoverContent>
        )
    }

    const displayPopoverContent = () => {
        return (
            <PopoverContent
                right={'0.5rem'}
                bg={useColorModeValue('gray.100', 'gray.700')}
                color={useColorModeValue('gray.700', 'gray.100')}
                _focus={{}}
            >
                <PopoverArrow />
                <PopoverHeader>
                    <Stack
                        direction={'row'}
                        h={'100%'}
                    >
                        <Center
                            h={'100%'}
                        >
                            <IconButton
                                icon={<ArrowBackIcon />}
                                variant={'ghost'}
                                h={'6'}
                                w={'6'}
                                minW={'6'}
                                onClick={() => {
                                    setPopoverPage('');
                                }}
                            />
                            <Heading
                                fontSize={'2xl'}
                                pl={2}
                            >
                                Display
                            </Heading>
                        </Center>
                    </Stack>
                </PopoverHeader>
                <PopoverBody>
                    <Stack
                        direction={'row'}
                        h={'100%'}
                        pl={1}
                    >
                        {colorMode === 'light' ?
                            <SunIcon
                                pt={1}
                                left={0}
                            /> :
                            <MoonIcon
                                left={0}
                                pt={1}
                            />}
                        <Stack
                            direction={'column'}
                        >
                            <Heading
                                fontSize={'lg'}
                                fontWeight={'semibold'}
                                pl={2}
                            >
                                Dark Mode
                            </Heading>
                            <RadioGroup
                                onChange={setColorMode}
                                value={colorMode}
                            >
                                <Stack
                                    direction={'column'}
                                >
                                    <Radio value='dark'>On</Radio>
                                    <Radio value='light'>Off</Radio>
                                </Stack>
                            </RadioGroup>
                        </Stack>
                    </Stack>
                </PopoverBody>
            </PopoverContent>
        )
    }

    const userLogout = () => {
        deleteToken();
        deleteUser();
        history.go(0);
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
                                pr={3}
                                rounded={'full'}
                                onClick={() =>
                                    history.push(`/u/${userData['username']}`)
                                }
                            >
                                {userData['username']}
                            </Button>
                            {popover()}
                        </Stack>
                    </Stack>
                </Flex>
            </Box>
            <Spacer pb={16} />
        </Box>
    )
}