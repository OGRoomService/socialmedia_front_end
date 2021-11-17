import React, { Component } from "react";
import '../styles/Header.css';
import { ChakraProvider, Input } from "@chakra-ui/react"

export default class ProfileHeader extends Component {
    render() {
        return (
            <ChakraProvider>
                <div className="Header">
                    <nav>
                        <ul>
                            <li><a href="/">Post Feed</a></li>
                            <li><Input id="search-bar" type="text" placeholder="Search..." /></li>
                            {/* <li className="right-align"><a href="/profile">Profile</a></li> */}
                            <li className="right-align"><a href="/">Settings</a></li>
                        </ul>
                    </nav>
                </div>
            </ChakraProvider>
        )
    }
}