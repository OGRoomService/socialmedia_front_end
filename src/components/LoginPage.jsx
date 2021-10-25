import React, { Component } from "react";
import Footer from "./Footer";

export default class LoginPage extends Component {
    render() {
        return (
            <>
                <div>
                    <div class="#container-m">
                        <h1>Login</h1>
                        <form action="/" method="POST">
                            <input type="text" placeholder="username" required />
                            <input type="text" placeholder="Password" required />
                            <input type="submit" value="Login"/>
                        </form>
                        <p>Don't have an account? <a href="/register">Sign up here!</a></p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

}

export { LoginPage }