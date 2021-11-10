import React, { Component, useState } from "react";
import Footer from "./Footer";
import '../styles/login.css';
import LogHeader from "./LogHeader";
import { ChakraProvider } from "@chakra-ui/react"

function LoginFormFunction() {
    const [formData, setFormData] = useState({
        uname: "",
        pass: ""
    });

    const [formErrors, setFormErrors] = useState({});

    const handleUpdate = (e) => {
        const {name, value} = e.currentTarget;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        console.log("Login attempted");
    }

    return (
        <ChakraProvider>
        <LogHeader/>
            <div>
            <h2>Rowanspace</h2>
                <div className="containerL">
                    <div className="containerL" id="containerL-m">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <label
                                className="form-header"
                                htmlFor="login-username">
                                    Username</label>
                            <input
                                id="login-username"
                                name="uname"
                                type="text"
                                placeholder="username"
                                onChange={handleUpdate}
                                required />
                            <label className="form-header"
                                htmlFor="login-password">
                                    Password</label>
                            <input
                                id="login-password"
                                name="pass"
                                type="text"
                                placeholder="Password"
                                onChange={handleUpdate}
                                required />
                            <input type="submit" value="Login"/>
                            <p>Don't have an account? <a href="/register">Sign up here!</a></p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
            
        </ChakraProvider>
    )
}

export default class LoginPage extends Component {
    render() {
        return (
            <ChakraProvider>
            <LoginFormFunction />
            </ChakraProvider>
        );
    }

}

export { LoginPage }