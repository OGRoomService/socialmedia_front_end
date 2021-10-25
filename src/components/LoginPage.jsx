import React, { Component, useState } from "react";
import Footer from "./Footer";
import '../styles/login.css';

function LoginFormFunction() {
    /* const [formData, setFormData] = useState({
        uname: "",
        pass: ""
    });

    const handleUpdate = (e) => {
        const {name, value} = e.currentTarget;

        setFormData({
            ...formData,
            [name]: value
        });
    } */

    const handleSubmit = (e) => {
        console.log("Login attempted");
        //console.log(formData.uname + " " + formData.pass);
    }

    return (
        <>
            <div>
            <h2>Rowanspace</h2>
                <div class="containerL">
                    <div class="containerL" id="containerL-m">
                        <h1>Login</h1>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <label
                                class="form-header"
                                htmlFor="login-username">
                                    Username</label>
                            <input
                                id="login-username"
                                name="uname"
                                type="text"
                                placeholder="username"
                                /* onChange={handleUpdate} */
                                required />
                            <label class="form-header"
                                htmlFor="login-password">
                                    Password</label>
                            <input
                                id="login-password"
                                name="pass"
                                type="text"
                                placeholder="Password"
                                /* onChange={handleUpdate} */
                                required />
                            <input type="submit" value="Login"/>
                        </form>
                        <p>Don't have an account? <a href="/register">Sign up here!</a></p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default class LoginPage extends Component {
    render() {
        return (
            LoginFormFunction()
        );
    }

}

export { LoginPage }