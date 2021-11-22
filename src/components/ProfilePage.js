import React from "react";
import Footer from "./Footer";
import { ProfileHeader } from "./ProfileHeader";
import "../styles/main.css";
import { Box, Flex, Heading, Circle, Button, Input } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"


export default function ProfilePage() {
    return (
        <ChakraProvider>
           <ProfileHeader />
        <br/>
        <Heading as="h2" size="3xl" isTruncated>
            Profile page
            <br/>
        </Heading>
        
        <Flex h="100%" w="100%" flexDirection={"column"} alignItems="center">

        <Flex w="100%" h="500px" c-flex flexDirection={"row"} align="center" /*bgGradient="linear(to-t, green.200, pink.500)" border="2px, black" */ verticalAlign={"middle"}>
            <Flex w="50%" h="50%">
            <Circle size="200px" bg="black" color="white">
                Profile Picture
            </Circle>

            <Heading as="h3" size="3xl" isTruncated marginTop="100px">
            USERNAME
            </Heading>
               {/* Hello Good Morning */}
            </Flex> 
            {/* <Box w="30%" h="200px" c-flex align="center" bgGradient="linear(to-t, red.200, blue.500)"> 
                Hello Good Morning
            </Box> 
            */}
        </Flex>

        <Heading as="h3" size="3xl" isTruncated>
            USER BIO
        </Heading>

        </Flex>
        <br/>
        <Footer />
        </ChakraProvider>

    )
}