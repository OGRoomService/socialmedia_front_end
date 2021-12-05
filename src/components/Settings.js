import React from "react";
import Footer from "./Footer";
import { Header } from "./Header";
import "../styles/main.css";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
    Button,
    ChevronDownIcon,
    ChakraProvider,
    Heading,
    Box,
    Select,
    Flex
} from '@chakra-ui/react'


export const Settings = () => {
    return (
        <Flex
            flexDir={'column'}
            minH={'100vh'}
        >
            <Header />
            <Heading as="h2" size="3xl" isTruncated>
                Settings
            </Heading>
            <br />
            Privacy
            <Select placeholder='Default: Posts and Profile Public'>
                <option value='option1'>Only Posts Public</option>
                <option value='option2'>Only Profile Public</option>
                <option value='option3'>Everything Private</option>
            </Select>
            <br />
            Notification
            <Select placeholder='Default: On website and through text'>
                <option value='option1'>Only on website</option>
                <option value='option2'>No no</option>
                <option value='option3'>Option 3</option>
            </Select>
            <Footer />
        </Flex>
    )
}