import React, { Component } from "react";
import '../styles/Header.css';
import { useColorMode, Input, Button, Box, Flex } from "@chakra-ui/react"
import { useToken } from "../api/token";
import { useHistory } from "react-router";

export const Header = () => {
    const token = useToken();
    const history = useHistory();
    const { colorMode, toggleColorMode } = useColorMode();

    const logout = () => {
        token.deleteToken();
        history.go(0);
    }

    return (
        <Box>
            <Flex
                minH='50px'
            >

            </Flex>
        </Box>
        /* <ChakraProvider>
            <div className="Header">
                <nav>
                    <ul>
                        <li><a href="/">Post Feed</a></li>
                        <li><Input id="search-bar" type="text" placeholder="Search..." /></li>
                        <li className="right-align"><a href="/profile">Profile</a></li>
                        <li className="right-align"><a href="/">Settings</a></li>
                        <li className="right-align">
                            <Button
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </ChakraProvider> */
    )
}