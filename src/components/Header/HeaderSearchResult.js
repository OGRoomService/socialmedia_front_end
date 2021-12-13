import React, { useEffect, useState } from "react";
import { useAsyncAPI } from '../../api/api'
import {
    Avatar,
    Text,
    Center,
    Stack,
    Button
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const HeaderSearchResult = ({ userData }) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const { fetchProfilePictureFromId } = useAsyncAPI();
    const history = useHistory();

    useEffect(() => {
        fetchProfilePictureFromId(userData['id'], setProfilePicture);
    }, []);

    return (
        <Button
            mb='2'
            w={'100%'}
            justifyContent={'left'}
            variant={'ghost'}
            onClick={() => 
                history.push(`/u/${userData.username}`)
            }
        >
            <Center
                h={'100%'}
            >
                <Stack
                    direction={'row'}
                >
                    <Avatar
                        size='sm'
                        src={profilePicture}
                    />
                    <Text
                        display={'flex'}
                        alignItems={'center'}
                    >
                        {userData['username']}
                    </Text>
                </Stack>
            </Center>
        </Button>
    )
}