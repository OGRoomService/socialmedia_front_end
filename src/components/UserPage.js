import React from "react";
import { useParams } from "react-router";
import { ChakraProvider } from "@chakra-ui/react"

export default function UserPage() {
    var { id } = useParams();

    return (
        <ChakraProvider>
            <h1>Hello there user {id}</h1>
            <p>This is your profile</p>
        </ChakraProvider>
    )
}