import React from "react";
import "../styles/BlankHeader.css";
import { Box } from "@chakra-ui/react"

export const LoginHeader = () => {
    return (
        <Box>
            <div className="top">
                <h1 style={{color: "orange"}}>Log In</h1>
            </div>
        </Box>
    );
}

