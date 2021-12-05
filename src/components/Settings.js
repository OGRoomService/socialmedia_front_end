import React from "react";
import Footer from "./Footer";
import { Header } from "./Header";
import { useToken } from "../api/token";
import "../styles/main.css";
import {
    Heading,
    Select,
    Flex,
    Button
} from '@chakra-ui/react'


export const Settings = () => {
    const token = useToken();

    const logout = () => {
        token.deleteToken();
        history.go(0);
    }

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
            <Button
                onClick={() => {
                    logout();
                }}
            >
                Log Out
            </Button>
            <Footer />
        </Flex>
    )
}