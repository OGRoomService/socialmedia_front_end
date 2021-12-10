import React from "react";
import {
    Box,
    Heading,
    useColorModeValue,
    Text
} from "@chakra-ui/react";

export const NoPosts = ({ isUser }) => {
    return (
        <Box
            mb='5'
            borderWidth="1px"
            borderRadius="lg"
            p={5}
            bg={useColorModeValue('gray.100', 'gray.700')}
        >
            <Heading>
                Uh oh, there are no posts!
            </Heading>
            <Text
                pt={2}
            >
                {isUser ? "Create your first post now..." : "This user has no posts..."}
                
            </Text>
        </Box>
    )
}