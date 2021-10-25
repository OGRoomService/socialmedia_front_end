import React, { Component } from "react";
import Footer from "./Footer";
import '../styles/login.css';

export default class LoginPage extends Component {
    render() {
        return (
            <>
                <div>
                <h2>Rowanspace</h2>
                    <div class="containerL">
                        <div class="containerL" id="containerL-m">
                            <h1>Login</h1>
                            <form action="/" method="POST">
                                <h3>Username</h3>
                                <input type="text" placeholder="username" required />
                                <h3>Password</h3>
                                <input type="text" placeholder="Password" required />
                                <input type="submit" value="Login"/>
                            </form>
                            <p>Don't have an account? <a href="/register">Sign up here!</a></p>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

}

export { LoginPage }