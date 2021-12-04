import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import { Box, Input } from "@chakra-ui/react"
import { PostFeed } from "./PostFeed/PostFeed";

export const MainPage = (token) => {
    return (
        <Box>
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
                        <Input placeholder="Search..." size="md" />
                        <div className="head"></div>
                        <h1>Post Feed</h1>
                        <PostFeed />
                    </div>
                    <div className="container" id="container-r">

                        <h1>Friends List</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </Box>
    )
};