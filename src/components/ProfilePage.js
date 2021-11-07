import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "../styles/main.css";

export default function ProfilePage() {
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
                </div>
                <div className="container" id="container-r">
                    
                    <h1>Friends List</h1>
                </div>
            </div>
        </div>
        <Footer />
    </>

    )
}