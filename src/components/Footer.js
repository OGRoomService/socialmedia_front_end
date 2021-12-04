import React from "react";
import logo from "../Rowan.png";
import '../styles/footer.css';
import { Box, Flex, Image } from "@chakra-ui/react"

export default function Footer() {
    return (
        <Flex w="100%" h="70px" flexDirection={"column"} >
            <Flex w="100%" flexDirection={"column"} alignItems="center" bgColor="#333333">
                <Image src={logo} w="100px" h="65px" />
            </Flex>
        </Flex>
    )
}