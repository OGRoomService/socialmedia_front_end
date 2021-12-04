import React, { Component } from "react";
import '../styles/Header.css';
import { Box, Input, Button } from "@chakra-ui/react"
import { useToken } from "../api/token";
import { useHistory } from "react-router";

export const ProfileHeader = () => {
    const token = useToken();
    const history = useHistory();

    const logout = () => {
        token.deleteToken();
        history.go(0);
    }

    return (
        <Box>
            <nav>
                <ul>
                    <li><a href="/">Post Feed</a></li>
                    <li><Input id="search-bar" type="text" placeholder="Search..." /></li>
                    {/* <li className="right-align"><a href="/profile">Profile</a></li> */}
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
        </Box>
    )
}