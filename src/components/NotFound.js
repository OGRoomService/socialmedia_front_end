import React from "react";
import Footer from "./Footer";
import { ChakraProvider } from "@chakra-ui/react"


export default function NotFound() {
    return (
        <ChakraProvider>
            <h1>404 Not Found</h1>
            <Footer />
        </ChakraProvider>
    );
}