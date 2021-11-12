import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../styles/main.css";
import { Box, Flex, Heading, Circle } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"


export default function ProfilePage() {
    return (
        <ChakraProvider>
        <Header />
        <br/>
        <Heading as="h2" size="3xl" isTruncated>
            Profile page
        </Heading>
        <Flex w="100%" h="500px" c-flex flexDirection={"row"} align="center" /*bgGradient="linear(to-t, green.200, pink.500)"*/ border="2px, black">
            <Box w="50%" h="50%" c-flex bgGradient="linear(to-t, green.200, pink.500)">
            <Circle size="200px" bg="black" color="white">
                PFP
            </Circle>
               {/* Hello Good Morning */}
            </Box> 
            {/* <Box w="30%" h="200px" c-flex align="center" bgGradient="linear(to-t, red.200, blue.500)"> 
                Hello Good Morning
            </Box> 
            */}
        </Flex>
        <br/>
        <Footer />
    </ChakraProvider>

    )
}