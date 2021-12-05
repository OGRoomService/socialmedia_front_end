import React from "react";
import { useParams } from "react-router";
import { Box } from "@chakra-ui/react"

export default function UserPage() {
    var { id } = useParams();

    return (
        <Box>
            <h1>Hello there user {id}</h1>
            <p>This is your profile</p>
        </Box>
    )
}