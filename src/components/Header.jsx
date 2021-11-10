import React, { Component } from "react";
import '../styles/Header.css';
import { ChakraProvider } from "@chakra-ui/react"

export default class Header extends Component {
    render() {
        return (
            <ChakraProvider>
                <div className="Header">
                    <nav>
                        <ul>
                            <li><a href="/home">Post Feed</a></li>
                            <li><input id="search-bar" type="text" placeholder="Search..." /></li>
                            <li className="right-align"><a href="/">Profile</a></li>
                            <li className="right-align"><a href="/">Settings</a></li>
                        </ul>
                    </nav>
                </div>
            </ChakraProvider>
        )
    }
}