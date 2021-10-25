import React, { Component } from "react";
import logo from "../Rowan.png";
import '../styles/footer.css';

export default class Footer extends Component {
    render() {
        return (
            <>
            <div class="containerFoot">
                <div className="foot">
                    <a href="#foot">
                        <img class="logo" alt="website logo" src={logo} />
                    </a>
                </div>
            </div>
            </>
        )
    }
}
export {Footer}