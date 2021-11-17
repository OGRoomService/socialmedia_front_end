import React from "react";
import logo from "../Rowan.png";
import "../styles/BlankHeader.css";
import { ChakraProvider } from "@chakra-ui/react"


export default function RegHeader() {
    return (
        <ChakraProvider>
        <div class="containerTop">
            <div className="top">
                <h1 style={{color: "orange"}}>Sign Up</h1>
            </div>
        </div>
        </ChakraProvider>
    )
}