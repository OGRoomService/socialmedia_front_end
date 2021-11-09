import React, { Component, useState } from "react";
import Footer from "./Footer";
import '../styles/login.css';
import LogHeader from "./LogHeader";

export const LoginPage = ({ setToken }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState();

    const handleUpdate = (e) => {
        const {name, value} = e.currentTarget;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = () => {

    }

    return (
        <>
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
        </>
    )
}