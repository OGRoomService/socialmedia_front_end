import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { BsHouse } from 'react-icons/bs';
import {
    useColorModeValue,
    Button,
    Box,
    Flex,
    IconButton,
    Avatar,
    Stack,
    Spacer,
    Center,
    Heading
} from "@chakra-ui/react"
import { currentUser } from "../../api/user";
import { useToken } from "../../api/token";
import { HeaderPopover } from "./HeaderPopover";
import { HeaderInputPopover } from "./HeaderInputPopover";

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
    const { userData } = currentUser();
    const { token } = useToken();
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
                        <HeaderInputPopover />
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
                            <HeaderPopover profilePicture={profilePicture} />
                        </Stack>
                    </Stack>
                </Flex>
            </Box>
            <Spacer pb={16} />
        </Box>
    )
}