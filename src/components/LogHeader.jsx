import React, { Component } from "react";
import logo from "../Rowan.png";
import "../styles/BlankHeader.css";

export default class LogHeader extends Component {
    render() {
        return (
            <>
            <div class="containerTop">
                <div className="top">
                    <h1 style={{color: "aliceblue"}}>Log In</h1>
                </div>
            </div>
            </>
        )
    }
}
export {LogHeader}