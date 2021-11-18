import React from "react";
import logo from "../Rowan.png";
import '../styles/footer.css';
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/react"

export default function Footer() {
    return (
        <ThemeProvider theme={theme}>
        <CSSReset />
        <div className="containerFoot">
            <div className="foot">
                <a href="#foot">
                    <img className="logo" alt="website logo" src={logo} />
                </a>
            </div>
        </div>
        </ThemeProvider>
    )
}