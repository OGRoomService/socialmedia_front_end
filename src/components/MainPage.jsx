import React from "react";
import logo from "../Rowan.png";

export default function MainPage() {
    return (
        <>
            <div className="container" id="container-t">
                <div className="container">
                    <div className="container" id="container-l">
                        <ul>
                            <li><a href="#head">Post Feed</a></li>
                        </ul>
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
                        <div className="LikeButton"></div>
                        <div id="like_button_container"></div>
                        <script src="like_button.tsx"></script>
                        <div className="grid-item" id="box-two">
                        </div>
                    </div>
                    <div className="container" id="container-r">
                        <ul>
                            <li><a href="#user">Username</a></li>
                            <li><a href="#profile">Profile</a></li>
                        </ul>
                        <h1>Friends List</h1>
                    </div>
                </div>
                <div className="foot">
                    <a href="#foot">
                        <img alt="website logo" src={logo} />
                    </a>
                </div>
            </div>
        </>
    )
};