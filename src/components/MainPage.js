import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Post from "./Post";
import "../styles/main.css";
import { Input, ThemeProvider, theme, CSSReset } from "@chakra-ui/react"

export default function MainPage() {
    return (
        <ThemeProvider theme={theme}>
        <CSSReset />
            <Header />
            <div className="container" id="container-t">
                <div className="container">
                    <div className="container" id="container-l">
                        <h1>Spacing</h1>
                        <div
                        //className="grid-item" id="box-one"
                        >
                        </div>
                    </div>

                    <div className="container" id="container-m">
                        <div className="head"></div>
                        <input type="text" placeholder="Search.." />
                        <div className="head"></div>
                        <h1>Post Feed</h1>
                        <Post/>
                    </div>
                    <div className="container" id="container-r">
                        
                        <h1>Friends List</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </ThemeProvider>
    )
};