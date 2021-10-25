import React, { Component } from "react";
import logo from "../Rowan.png";

export default class Footer extends Component {
    render() {
        return (
            <>
                <div className="foot">
                    <a href="#foot">
                        <img alt="website logo" src={logo} />
                    </a>
                </div>
            </>
        )
    }
}
export {Footer}