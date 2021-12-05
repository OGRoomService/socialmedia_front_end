import React from "react";
import logo from "../Rowan.png";
import '../styles/footer.css';
import {
    Flex,
    Image,
    useColorModeValue,
    Center
} from "@chakra-ui/react"

export default function Footer() {
    return (
        <Flex
            w="100%"
            h="70px"
            w="100%"
            mt={'auto'}
            bg={useColorModeValue('gray.100', 'gray.700')}
        >
            <Center w={'100%'}>
                <Image src={logo} w="100px" h="65px" />
            </Center>
        </Flex>
    )
}