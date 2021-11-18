import React from "react";
import "../styles/BlankHeader.css";
import { ChakraProvider } from "@chakra-ui/react"

export const LoginHeader = () => {
    return (
        <ChakraProvider>
        <div className="containerTop">
            <div className="top">
                <h1 style={{color: "orange"}}>Log In</h1>
            </div>
        </div>
        </ChakraProvider>
    );
}

