import React from "react";
import "../styles/BlankHeader.css";
import { ChakraProvider } from "@chakra-ui/react"


export default function RegHeader() {
    return (
        <ChakraProvider>
        <div className="containerTop">
            <div className="top">
                <h1 style={{color: "orange"}}>Sign Up</h1>
            </div>
        </div>
        </ChakraProvider>
    )
}