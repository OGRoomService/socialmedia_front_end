import React from "react";
import { ChakraProvider, Heading, Text } from "@chakra-ui/react"


export default function NotFound() {
    return (
        <ChakraProvider>
            {/* <h1>404 Not Found</h1> */}
            <Heading as="h2" size="4x5" mb="6"><Text fontSize="6xl" mt="20"> 404 Not Found </Text></Heading>

            {/* <Footer /> */}
        </ChakraProvider>
    );
}