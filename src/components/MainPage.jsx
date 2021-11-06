import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Post from "./Post";
import "../styles/main.css";

export default function MainPage() {
    return (
        <>
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
        </>
    )
};