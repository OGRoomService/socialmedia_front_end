import React from "react";
import logo from "../Rowan.png";
import "../styles/BlankHeader.css";
import { ChakraProvider } from "@chakra-ui/react"

export const LoginHeader = () => {
    return (
        <ChakraProvider>
        <div className="containerTop">
            <div className="top">
                <h1 style={{color: "aliceblue"}}>Log In</h1>
            </div>
        </div>
        </ChakraProvider>
    );
}