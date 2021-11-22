import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
//import "../styles/main.css";
import { ChakraProvider } from "@chakra-ui/react"
import { Input, ThemeProvider, CSSReset } from "@chakra-ui/react"
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"
import { PostFeed } from "./PostFeed/PostFeed";

const customTheme = extendTheme(withDefaultColorScheme({ colorScheme: "red" }))



export const MainPage = (token) => {
    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <Header />
            <div className="container" id="container-t">
                <ThemeProvider theme={customTheme}>
                    <CSSReset />
                    <div className="container">
                        <ChakraProvider>
                            <div className="container" id="container-l">
                                <h1>Spacing</h1>
                                <div
                                //className="grid-item" id="box-one"
                                >
                                </div>
                            </div>
                        </ChakraProvider>

                        <div className="container" id="container-m">
                            <div className="head"></div>
                            <Input placeholder="Search..." size="md" />
                            <div className="head"></div>
                            <h1>Post Feed</h1>
                            <PostFeed />
                        </div>
                        <div className="container" id="container-r">

                            <h1>Friends List</h1>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
            <Footer />
        </ThemeProvider>
    )
};