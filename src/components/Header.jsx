import React, { Component } from "react";
import '../styles/Header.css';

export default class Header extends Component {
    render() {
        return (
            <>
                <div class="Header">
                    <nav>
                        <ul>
                            <li><a href="/home">Post Feed</a></li>
                            <li><input id="search-bar" type="text" placeholder="Search..." /></li>
                            <li class="right-align"><a href="/">Profile</a></li>
                            <li class="right-align"><a href="/">Settings</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}