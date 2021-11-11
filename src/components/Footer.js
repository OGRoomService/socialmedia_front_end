import React from "react";
import logo from "../Rowan.png";
import '../styles/footer.css';
import { ChakraProvider } from "@chakra-ui/react"

export default function Footer() {
    return (
        <ChakraProvider>
        <div className="containerFoot">
            <div className="foot">
                <a href="#foot">
                    <img className="logo" alt="website logo" src={logo} />
                </a>
            </div>
        </div>
        </ChakraProvider>
    )
}